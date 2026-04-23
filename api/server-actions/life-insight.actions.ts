'use server';

import { prisma } from '@/lib/prisma';
import { askOpenAILLM, LLMTransformedOutput } from './llm.actions';
import { insightPostAnalysisStatus, insightPostStatus } from '../constants/statuses';
import { LifeInsightAnalysisRecordCreateInput, LifeInsightPostCreateInput } from '@/db/generated/prisma/models';

export async function getLifeInsights(userId: number) {
  const data = await prisma.lifeInsightPost.findMany({
    where: {
      publisherId: userId,
    },
  });

  return data;
}

export async function getLifeInsightAnalysis(postId: number) {
  const data = await prisma.lifeInsightAnalysisRecord.findFirst({
    where: {
      original_post_id: postId,
    },
  });

  return data;
}

export async function postLifeInsight(postData: LifeInsightPostCreateInput) {
  const newPost = await prisma.lifeInsightPost.create({
    data: postData,
  });

  askOpenAILLM(`{
    overview=${postData.situation_overview},
    decision=${postData.final_decision},
    other_notes=${postData.other_content}
  }`, async ({ cognitive_distortions_list, missed_alternatives, analysis_category, analysis_content }: LLMTransformedOutput) => {
    await postLifeInsightAnalysis({
      original_post_id: newPost.id,
      status: insightPostAnalysisStatus.success,
      analysis_content,
      analysis_category,
      missed_alternatives: JSON.stringify(missed_alternatives),
      cognitive_distortions_list: JSON.stringify(cognitive_distortions_list),
    });
    await updateLifeInsightStatus(newPost.id, insightPostStatus.processed);
  }, async (errorText: any) => {
    await postLifeInsightAnalysis({
      original_post_id: newPost.id,
      status: insightPostAnalysisStatus.failed,
      analysis_content: "",
      analysis_category: "",
      missed_alternatives: JSON.stringify([]),
      cognitive_distortions_list: JSON.stringify([]),
      analysis_error_reason: errorText,
    });
    await updateLifeInsightStatus(newPost.id, insightPostStatus.processed);
  })
}

export async function postLifeInsightAnalysis(postAnalysisData: LifeInsightAnalysisRecordCreateInput) {
  await prisma.lifeInsightAnalysisRecord.create({
    data: postAnalysisData,
  });
}

export async function updateLifeInsightStatus(postId: number, status: string) {
   await prisma.lifeInsightPost.update({
    where: {
      id: postId,
    },
    data: {
      status,
    }
  });
}
