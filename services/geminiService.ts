
import { GoogleGenAI, Type } from "@google/genai";
import type { BlogPostSummary, BlogPostFull } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using mocked data. Please set the API_KEY for full functionality.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock_key" });

const blogPostListSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            category: {
                type: Type.STRING,
                description: 'A single, relevant category for the blog post (e.g., "Style Tips", "Trends", "Sustainable Fashion").'
            },
            title: {
                type: Type.STRING,
                description: 'A chic and appealing title for a fashion blog post.'
            },
            summary: {
                type: Type.STRING,
                description: 'A concise, one-sentence summary of the blog post.'
            }
        },
        required: ["category", "title", "summary"]
    }
};

const getFallbackIndex = (): BlogPostSummary[] => [
    { id: 'fall-essentials', title: '5 Fall Essentials Your Wardrobe Needs', summary: 'Discover the key pieces to effortlessly transition your style into the autumn season.', imageUrl: 'https://picsum.photos/seed/fashion1/800/600', category: 'Style Tips' },
    { id: 'sustainable-style', title: 'Sustainable Style: How to Build a Conscious Closet', summary: 'Learn how to make eco-friendly choices without sacrificing your personal style.', imageUrl: 'https://picsum.photos/seed/fashion2/800/600', category: 'Sustainable Fashion' },
    { id: 'color-trends-2024', title: 'The Color Trends Dominating 2024', summary: 'From soft pastels to bold hues, find out which colors are taking over the fashion world this year.', imageUrl: 'https://picsum.photos/seed/fashion3/800/600', category: 'Trends' },
    { id: 'api-key-not-found', title: 'API Key Not Found', summary: 'Please ensure your Google Gemini API key is configured to generate live content.', imageUrl: 'https://picsum.photos/seed/fashion4/800/600', category: 'System' },
];

export const generateBlogIndex = async (): Promise<BlogPostSummary[]> => {
    if (!process.env.API_KEY || process.env.API_KEY === "mock_key") {
        return getFallbackIndex();
    }
    try {
        const prompt = "Generate 6 creative blog post titles, a 1-sentence summary, and a category for each. The topics should be about women's fashion, style tips, seasonal trends, and sustainable fashion. Categories could be 'Style Tips', 'Trends', 'How-To', or 'Sustainable Fashion'.";
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: blogPostListSchema,
            },
        });

        const jsonStr = response.text.trim();
        const posts = JSON.parse(jsonStr) as { title: string; summary: string; category: string }[];
        
        return posts.map((post, index) => ({
            ...post,
            id: encodeURIComponent(post.title.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')),
            imageUrl: `https://picsum.photos/seed/fashion${index + 1}/800/600`
        }));

    } catch (error) {
        console.error("Error generating blog index:", error);
        return getFallbackIndex();
    }
};

const getFallbackContent = (title: string): BlogPostFull => ({
    title: 'Error Fetching Content',
    content: 'Could not generate the blog post. The API might be unavailable or an error occurred. This is fallback content demonstrating the page layout. \n\n ## What Happened? \n\n An API call to Google Gemini failed. This can happen for several reasons: an invalid API key, network issues, or a problem with the service itself. We have displayed this placeholder content to maintain a consistent user experience.',
    author: 'System Monitor',
    publishDate: new Date().toLocaleDateString(),
    imageUrl: `https://picsum.photos/seed/contenterror/1200/800`
});

export const generateBlogPostContent = async (title: string): Promise<BlogPostFull> => {
    if (!process.env.API_KEY || process.env.API_KEY === "mock_key") {
        return getFallbackContent(title);
    }
    try {
        const decodedTitle = decodeURIComponent(title.replace(/-/g, ' '));
        const prompt = `Generate a full, well-structured fashion blog post of approximately 500 words for the title: "${decodedTitle}". The post should have a friendly, encouraging tone, and be written for a women's fashion blog. Include practical style tips. Use markdown for formatting: use '## ' for subheadings (with a space). At the very end of the entire text, on separate lines, add a fictional author name (e.g., 'Author: Chloe Stevens') and a recent date prefixed with 'Publish Date:'.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text;
        
        const lines = text.split('\n');
        const authorLine = lines.find(line => line.toLowerCase().startsWith('author:')) || 'Author: Style Editor';
        const dateLine = lines.find(line => line.toLowerCase().startsWith('publish date:')) || `Publish Date: ${new Date().toLocaleDateString()}`;
        
        const author = authorLine.replace(/author:/i, '').trim();
        const publishDate = dateLine.replace(/publish date:/i, '').trim();

        const content = lines.filter(line => !line.toLowerCase().startsWith('author:') && !line.toLowerCase().startsWith('publish date:')).join('\n');

        return {
            title: decodedTitle.replace(/\b\w/g, l => l.toUpperCase()),
            content: content.trim(),
            author: author,
            publishDate: publishDate,
            imageUrl: `https://picsum.photos/seed/${encodeURIComponent(title)}/1200/800`
        };
    } catch (error) {
        console.error("Error generating blog post content:", error);
        return getFallbackContent(title);
    }
};
