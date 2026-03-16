import { Tool } from '../types';

export const initialTools: Omit<Tool, 'id' | 'created_at'>[] = [
  {
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI model capable of generating human-like text.',
    url: 'https://chat.openai.com',
    category: 'Chat',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    tags: 'llm,chatbot,openai,text',
    featured: 1
  },
  {
    name: 'Midjourney',
    description: 'Generative artificial intelligence program and service that generates images from natural language descriptions.',
    url: 'https://www.midjourney.com',
    category: 'Image',
    pricing: 'Paid',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png',
    tags: 'art,generation,discord',
    featured: 1
  },
  {
    name: 'GitHub Copilot',
    description: 'AI-powered code completion tool that helps developers write code faster.',
    url: 'https://github.com/features/copilot',
    category: 'Coding',
    pricing: 'Paid',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/GitHub_Copilot_logo.svg',
    tags: 'developer,autocomplete,programming',
    featured: 1
  },
  {
    name: 'Runway',
    description: 'AI research company shaping the next era of art, entertainment and human creativity.',
    url: 'https://runwayml.com',
    category: 'Video',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Runway_AI_Logo.svg/1200px-Runway_AI_Logo.svg.png',
    tags: 'editor,generation,creative',
    featured: 0
  },
  {
    name: 'Hugging Face',
    description: 'The AI community building the future. Build, train and deploy state of the art models powered by the reference open source in machine learning.',
    url: 'https://huggingface.co',
    category: 'Coding',
    pricing: 'Free',
    image_url: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    tags: 'opensource,models,datasets',
    featured: 0
  },
  {
    name: 'Stable Diffusion',
    description: 'Latent text-to-image diffusion model capable of generating photo-realistic images given any text input.',
    url: 'https://stability.ai',
    category: 'Image',
    pricing: 'Free',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Stable_Diffusion_Logo.png',
    tags: 'opensource,generation,art',
    featured: 0
  },
  {
    name: 'Claude',
    description: 'A next-generation AI assistant built for work and trained to be safe, accurate, and secure.',
    url: 'https://claude.ai',
    category: 'Chat',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Claude_AI_logo.svg',
    tags: 'anthropic,llm,chatbot',
    featured: 1
  },
  {
    name: 'Jasper',
    description: 'AI copywriter and content generator for teams.',
    url: 'https://www.jasper.ai',
    category: 'Writing',
    pricing: 'Paid',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Jasper_AI_Logo.svg/1200px-Jasper_AI_Logo.svg.png',
    tags: 'marketing,copywriting,business',
    featured: 0
  },
  {
    name: 'Descript',
    description: 'All-in-one video and audio editing, as easy as a doc.',
    url: 'https://www.descript.com',
    category: 'Video',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Descript_logo.svg/1200px-Descript_logo.svg.png',
    tags: 'transcription,editing,podcast',
    featured: 0
  },
  {
    name: 'Synthesia',
    description: 'Create professional AI videos from text in 120+ languages.',
    url: 'https://www.synthesia.io',
    category: 'Video',
    pricing: 'Paid',
    image_url: 'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/61dc0796f359b669fbc06eef_synthesia-logo.svg',
    tags: 'avatar,presentation,text-to-video',
    featured: 0
  },
  {
    name: 'ElevenLabs',
    description: 'The most realistic and versatile AI speech software.',
    url: 'https://elevenlabs.io',
    category: 'Audio',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/ElevenLabs_logo.svg/1200px-ElevenLabs_logo.svg.png',
    tags: 'voice,tts,cloning',
    featured: 1
  },
  {
    name: 'Notion AI',
    description: 'Access the limitless power of AI, right inside Notion.',
    url: 'https://www.notion.so/product/ai',
    category: 'Writing',
    pricing: 'Paid',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    tags: 'productivity,notes,workspace',
    featured: 0
  },
  {
    name: 'GrammarlyGO',
    description: 'AI communication assistant that helps you write better, faster.',
    url: 'https://www.grammarly.com',
    category: 'Writing',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Grammarly_logo.svg/1200px-Grammarly_logo.svg.png',
    tags: 'grammar,editing,assistant',
    featured: 0
  },
  {
    name: 'Quillbot',
    description: 'AI-powered paraphrasing tool.',
    url: 'https://quillbot.com',
    category: 'Writing',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/QuillBot_logo.svg/1200px-QuillBot_logo.svg.png',
    tags: 'paraphrasing,student,academic',
    featured: 0
  },
  {
    name: 'Character.ai',
    description: 'Chat with open-ended AI characters.',
    url: 'https://character.ai',
    category: 'Chat',
    pricing: 'Free',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Character.ai_logo.svg/1200px-Character.ai_logo.svg.png',
    tags: 'entertainment,roleplay,social',
    featured: 0
  },
  {
    name: 'Perplexity',
    description: 'An AI-powered answer engine that delivers accurate, trusted, and real-time answers.',
    url: 'https://www.perplexity.ai',
    category: 'Chat',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg',
    tags: 'search,research,answers',
    featured: 1
  },
  {
    name: 'Adobe Firefly',
    description: 'Generative AI for creators, focused on image and text effect generation.',
    url: 'https://firefly.adobe.com',
    category: 'Image',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Adobe_Firefly_Icon.svg/1200px-Adobe_Firefly_Icon.svg.png',
    tags: 'design,creative,adobe',
    featured: 0
  },
  {
    name: 'Leonardo.ai',
    description: 'Generate production-quality assets for your creative projects with AI-driven speed and style-consistency.',
    url: 'https://leonardo.ai',
    category: 'Image',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Leonardo_Ai_Logo.svg/1200px-Leonardo_Ai_Logo.svg.png',
    tags: 'assets,game-dev,art',
    featured: 0
  },
  {
    name: 'Tabnine',
    description: 'AI assistant for software developers.',
    url: 'https://www.tabnine.com',
    category: 'Coding',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Tabnine_logo.svg/1200px-Tabnine_logo.svg.png',
    tags: 'ide,autocomplete,code',
    featured: 0
  },
  {
    name: 'Replit Ghostwriter',
    description: 'An AI pair programmer that helps you write better code, faster.',
    url: 'https://replit.com/site/ghostwriter',
    category: 'Coding',
    pricing: 'Paid',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Replit_Logo.svg/1200px-Replit_Logo.svg.png',
    tags: 'cloud,ide,collaboration',
    featured: 0
  },
  {
    name: 'Murf.ai',
    description: 'Go from text to speech with a versatile AI voice generator.',
    url: 'https://murf.ai',
    category: 'Audio',
    pricing: 'Freemium',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Murf_AI_Logo.svg/1200px-Murf_AI_Logo.svg.png',
    tags: 'voiceover,studio,narration',
    featured: 0
  }
];
