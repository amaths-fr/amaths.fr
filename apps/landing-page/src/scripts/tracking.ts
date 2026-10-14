import { OpenAiEvents } from "../lib/openai.ts";
import { MetaEvents } from "../lib/meta.ts";

OpenAiEvents.emitPageViewedIfNeeded();
MetaEvents.emitPageViewed();
