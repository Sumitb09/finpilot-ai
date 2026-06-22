import { generateText } from "./gemini.ts";

export async function chat(prompt: string) {
  return generateText(prompt);
}

export async function report(prompt: string) {
  return generateText(prompt);
}

export async function receipt(prompt: string) {
  return generateText(prompt);
}

export async function insight(prompt: string) {
  return generateText(prompt);
}