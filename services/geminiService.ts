import { GoogleGenAI, Type } from "@google/genai";
import type { DestinationSummary } from '../types';

export async function fetchSummaries(destinations: string[]): Promise<DestinationSummary[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const filteredDestinations = destinations.filter(d => d.trim() !== '');
    const destinationList = filteredDestinations.map(d => `「${d.trim()}」`).join('、');

    const prompt = `
    日本の観光地${destinationList}の${filteredDestinations.length}ヶ所について、それぞれの見どころを200字以内の日本語で要約してください。
    結果はJSONフォーマットで、"summaries"というキーを持つオブジェクトとして返してください。
    "summaries"の値は、"destination"（観光地名）と"summary"（要約）のキーを持つオブジェクトの配列にしてください。
    観光地名は入力されたものと完全に一致させてください。
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summaries: {
                            type: Type.ARRAY,
                            description: '観光地のリスト',
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    destination: {
                                        type: Type.STRING,
                                        description: '観光地の名前',
                                    },
                                    summary: {
                                        type: Type.STRING,
                                        description: '観光地の見どころの概要（200字以内）',
                                    },
                                },
                                required: ['destination', 'summary']
                            }
                        }
                    },
                    required: ['summaries']
                }
            }
        });

        const responseText = response.text.trim();
        const parsedJson = JSON.parse(responseText);
        
        if (!parsedJson.summaries || !Array.isArray(parsedJson.summaries)) {
          throw new Error("Invalid response format from AI: 'summaries' array not found.");
        }
        
        return parsedJson.summaries;

    } catch (error) {
        console.error("Error fetching summaries from Gemini API:", error);
        throw new Error("AIからの応答の解析に失敗しました。");
    }
}