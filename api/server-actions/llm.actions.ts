"use server";

import OpenAI from "openai";

const LLM_BASE_INSTRUCTION =
  "You are assistant who is proficient about life-decision questions and well-educated in psychology. As example, i can provide you with a life-situation and ask you what i did wrong." +
  "As a user, i gonna prompt you with following template: { overview=my situation, decision=my decision, other_notes=other notes }";
const LLM_OUTPUT_INSTRUCTION = "I want to receive output from you in following format (valid JSON object): { 'category': ['category classifier 1', ...], 'missed_alternatives': ['alternative behaviour 1', ...], 'cognitive_distortions_list': ['distortion 1', ...], 'general_decision_review': 'bad decision was (for example)...' }";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface LLMTransformedOutput {
  analysis_content: string,
  analysis_category: string,
  missed_alternatives: string[],
  cognitive_distortions_list: string[],
}

export async function askOpenAILLM(prompt: string, onSuccessResponse: any, onError: any) {
  try {
    console.log(`(OpenAI LLM) LLM prompt ==> ${prompt}`);
    const response = await client.responses.create({
      model: 'gpt-3.5-turbo',
      instructions: `${LLM_BASE_INSTRUCTION} ${LLM_OUTPUT_INSTRUCTION}`,
      input: prompt,
    });
    console.log(`(OpenAI LLM) Orignal response for prompt ==>`, response);
    onSuccessResponse(parseOpenAIOutput(response.output_text));
  } catch (e) {
    onError(JSON.stringify(e));
    throw new Error(`Failed to call ${e}`);
  }
}

const parseOpenAIOutput = (output_text: string): LLMTransformedOutput => {
  const parsed = JSON.parse(output_text);

  return {
    analysis_content: parsed['general_decision_review'],
    analysis_category: JSON.stringify(parsed['category']),
    cognitive_distortions_list: parsed['cognitive_distortions_list'],
    missed_alternatives: parsed['missed_alternatives'],
  };
};
