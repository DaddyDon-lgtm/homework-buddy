// US English lessons, Grade 5, Common Core State Standards for English Language Arts.
// About 10 minutes each: goal, hook, learn, watch out, three Try It questions,
// then the regular practice round on the same topic.
//
// Text markup: **bold**, *italic*, and a new line starts a new line.
// "topic" must match the topic title in topics.js so Practice opens the right round.

export const US_ENGLISH_LESSONS = [
  {
    id: 'perfect-tenses',
    topic: 'Perfect verb tenses',
    standard: 'L.5.1b',
    goal: 'I can use *has/have*, *had* and *will have* to show when actions are finished.',
    hook: {
      text: '*Mia has learned three dance routines.*\n*Before the concert, she had practiced for two hours.*\n*By Friday, she will have learned five routines.*',
      ask: 'What do these three sentences have in common?',
      reveal:
        'All three use a helping verb (*has*, *had*, *will have*) plus a verb like *learned* or *practiced*. That is a **perfect tense**. It tells us an action is *finished* at a certain time.',
    },
    learn: [
      { text: 'The formula is **helping verb + past participle** (finished, eaten, gone, written).' },
      {
        h: 'Present perfect: has / have + participle',
        text: 'Finished before now, and it still matters now.',
        ex: ['I **have finished** my homework. (So now I can play.)', 'She **has visited** Japan twice.'],
      },
      {
        h: 'Past perfect: had + participle',
        text: 'Finished before another event in the past.',
        ex: ['The show **had started** when we arrived. (First the show started, then we arrived.)'],
      },
      {
        h: 'Future perfect: will have + participle',
        text: 'Will be finished before a time in the future.',
        ex: ['By 8 p.m., I **will have finished** my homework.'],
      },
    ],
    watch:
      'Some verbs have special participles: go → **gone**, eat → **eaten**, write → **written**, see → **seen**. Say *I have gone*, never *I have went*.',
    tryIt: [
      {
        q: 'By the time the concert ended, the fans ___ every song.',
        options: ['sang', 'had sung', 'have sung', 'will have sung'],
        answer: 1,
        hint: 'There are two past events. Which one finished first?',
        why: 'The singing finished before the concert ended, two events in the past, so we use the past perfect: *had sung*.',
      },
      {
        q: 'Look! I ___ my drawing!',
        options: ['had finished', 'have finished', 'will have finished', 'finishing'],
        answer: 1,
        hint: 'It is finished right now, and it matters now.',
        why: 'The drawing is finished and it matters right now, so we use the present perfect: *have finished*.',
      },
      {
        q: 'By next summer, my brother ___ to swim.',
        options: ['has learned', 'had learned', 'will have learned', 'learned'],
        answer: 2,
        hint: '"By next summer" is a time in the future.',
        why: 'It will be finished before a future time, so we use the future perfect: *will have learned*.',
      },
    ],
  },
  {
    id: 'tense-shifts',
    topic: 'Fixing shifts in verb tense',
    standard: 'L.5.1d',
    goal: 'I can keep my verb tenses steady and fix sentences that switch by mistake.',
    hook: {
      text: '*Yesterday Mia goes to the dance studio and practiced for an hour.*',
      ask: 'Something sounds wrong. Can you hear it?',
      reveal:
        '*Yesterday* tells us it happened in the past, and *practiced* is past, but *goes* is present. The sentence **shifts** tense by mistake. It should be: *Yesterday Mia **went** to the dance studio and practiced for an hour.*',
    },
    learn: [
      {
        h: 'Tense tells WHEN',
        text: 'Past: *walked*. Present: *walks*. Future: *will walk*.',
      },
      {
        h: 'Same time, same tense',
        text: 'When you describe things that happen at the same time, keep the same tense. Time words help you choose.',
        ex: [
          'Past: *yesterday, last week, in 2010*',
          'Present: *every day, now, usually*',
          'Future: *tomorrow, next year*',
        ],
      },
      {
        h: 'Change only when the time really changes',
        text: 'Switching is correct when the time actually changes.',
        ex: ['I **practiced** yesterday, and I **will practice** again tomorrow. (Correct: two different times.)'],
      },
    ],
    watch:
      'When you write a story, it is easy to slip from past into present in the middle. Pick one tense for the story and stick with it.',
    tryIt: [
      {
        q: 'Which sentence has a tense shift mistake?',
        options: [
          'We walked to the park and played soccer.',
          'We walked to the park and play soccer.',
          'We walk to the park and play soccer.',
        ],
        answer: 1,
        hint: 'Look for a sentence that mixes past and present.',
        why: '*walked* is past but *play* is present. Both actions happened at the same time, so they should match.',
      },
      {
        q: 'Last night, my sister watches a movie and fell asleep. Which change fixes the sentence?',
        options: ['watches → watched', 'fell → falls', 'night → morning'],
        answer: 0,
        hint: '"Last night" tells you the time.',
        why: '"Last night" is the past, so both verbs should be past: *watched* and *fell*.',
      },
      {
        q: 'Which sentence is correct?',
        options: [
          'Tomorrow we went to the zoo.',
          'Tomorrow we will go to the zoo.',
          'Tomorrow we will go to the zoo and saw lions.',
        ],
        answer: 1,
        hint: '"Tomorrow" is in the future.',
        why: '"Tomorrow" needs the future tense: *will go*. The last choice switches to *saw*, which is past.',
      },
    ],
  },
  {
    id: 'conj-prep-interj',
    topic: 'Conjunctions, prepositions and interjections',
    standard: 'L.5.1a',
    goal: 'I can explain what conjunctions, prepositions and interjections do in a sentence.',
    hook: {
      text: '*Wow! Mia danced across the stage and waved to the fans.*',
      ask: 'Three small words are doing three different jobs: *Wow*, *across* and *and*. What does each one do?',
      reveal: '*Wow* shows a feeling. *Across* tells where. *And* joins two actions. Each one is a different part of speech.',
    },
    learn: [
      {
        h: 'Conjunction: joins words or ideas',
        text: 'Remember **FANBOYS**: for, and, nor, but, or, yet, so. Others: *because, when, although, if*.',
        ex: ['I was tired, **but** I kept practicing.', 'We stayed inside **because** it was raining.'],
      },
      {
        h: 'Preposition: shows how things are related',
        text: 'It often tells *where* or *when*: in, on, under, across, before, after, with, during. It starts a phrase.',
        ex: ['The cat hid **under** the bed.', 'We ate **after** school.'],
      },
      {
        h: 'Interjection: shows a feeling',
        text: 'A short word followed by ! or a comma.',
        ex: ['**Hooray!** We won!', '**Oops**, I dropped it.', '**Oh**, I forgot my bag.'],
      },
    ],
    watch:
      'Some words can be a preposition OR a conjunction. *After school* uses *after* as a preposition (followed by a noun). *After we ate, we danced* uses it as a conjunction (it joins a whole idea with a verb).',
    tryIt: [
      {
        q: '"We stayed inside because it was raining." What part of speech is "because"?',
        options: ['conjunction', 'preposition', 'interjection'],
        answer: 0,
        hint: 'Is it joining two ideas?',
        why: '*Because* joins two ideas: "we stayed inside" and "it was raining." That makes it a conjunction.',
      },
      {
        q: '"The cat hid under the bed." Which word is a preposition?',
        options: ['cat', 'hid', 'under', 'bed'],
        answer: 2,
        hint: 'Which word tells WHERE?',
        why: '*Under* tells where the cat hid and starts the phrase "under the bed."',
      },
      {
        q: '"Hooray, we won the game!" What does "Hooray" do?',
        options: ['It joins two ideas.', 'It shows a strong feeling.', 'It tells where something is.'],
        answer: 1,
        hint: 'How do you feel when you say it?',
        why: '*Hooray* is an interjection. It shows excitement.',
      },
    ],
  },
  {
    id: 'correlative',
    topic: 'Correlative conjunctions (either/or, neither/nor)',
    standard: 'L.5.1e',
    goal: 'I can use pairs like *either/or*, *neither/nor*, *both/and* and *not only/but also*.',
    hook: {
      text: '*You can have either the pink light-stick or the blue one.*',
      ask: 'Two words work together as a team in this sentence. Which ones?',
      reveal: '*Either* and *or* work as a pair. Pairs like this are called **correlative conjunctions**.',
    },
    learn: [
      { text: 'Correlative conjunctions always come in **pairs**:' },
      { h: 'either … or', text: 'One of two choices.', ex: ['**Either** we practice now, **or** we practice after dinner.'] },
      { h: 'neither … nor', text: 'Not this one, and not that one.', ex: ['**Neither** my brother **nor** my sister likes spicy food.'] },
      { h: 'both … and', text: 'Two things are true.', ex: ['**Both** Mia **and** her friend can dance.'] },
      { h: 'not only … but also', text: 'Adds something extra or surprising.', ex: ['She is **not only** a singer **but also** a dancer.'] },
      { h: 'whether … or', text: 'Choosing between two possibilities.', ex: ["I can't decide **whether** to read **or** draw."] },
    ],
    watch:
      'Match the partners! *Neither* goes with *nor*, never with *or*. Wrong: *Neither the cat or the dog…* Right: *Neither the cat **nor** the dog…*',
    tryIt: [
      {
        q: '___ Tom nor Lisa came to the party.',
        options: ['Either', 'Neither', 'Both', 'Not only'],
        answer: 1,
        hint: 'Which word is the partner of "nor"?',
        why: '*Nor* always goes with *neither*: *Neither Tom nor Lisa came.*',
      },
      {
        q: 'She plays not only the piano ___ the violin.',
        options: ['and', 'or', 'but also', 'nor'],
        answer: 2,
        hint: 'What is the partner of "not only"?',
        why: '*Not only* is paired with *but also*.',
      },
      {
        q: 'Which sentence is correct?',
        options: ['Both my mom or my dad cook.', 'Both my mom and my dad cook.', 'Both my mom nor my dad cook.'],
        answer: 1,
        hint: 'What is the partner of "both"?',
        why: '*Both* is paired with *and*.',
      },
    ],
  },
  {
    id: 'commas',
    topic: 'Using commas correctly',
    standard: 'L.5.2',
    goal: 'I can use commas in lists, after introductory words, and when talking to someone.',
    hook: {
      text: '*"Let\'s eat Grandma!"*\n*"Let\'s eat, Grandma!"*',
      ask: 'What is the difference between these two sentences?',
      reveal: 'The first one sounds like we are going to eat Grandma! The comma in the second one shows we are *talking to* Grandma. One comma saves Grandma!',
    },
    learn: [
      {
        h: '1. Lists of three or more',
        text: 'Put commas between the items. Most US schools teach a comma before *and* too.',
        ex: ['We need glitter, glue, and paper.'],
      },
      {
        h: '2. After an introductory word or phrase',
        text: 'When a sentence starts with a lead-in, put a comma after it.',
        ex: ['After the concert, we bought snacks.', 'Yes, I finished.', 'Well, that was fun!'],
      },
      {
        h: '3. Talking to someone by name',
        text: 'Use commas to set off the name of the person you are talking to.',
        ex: ['Mia, come here!', 'Thank you, Mom.'],
      },
      {
        h: '4. Before a tag question',
        text: 'A short question added to the end of a sentence.',
        ex: ["You like K-pop, don't you?"],
      },
    ],
    watch:
      'Do not put a comma between the subject and its verb. Wrong: *My best friend, loves dancing.* Right: *My best friend loves dancing.*',
    tryIt: [
      {
        q: 'Which sentence uses commas correctly?',
        options: ['I packed a hat, sunglasses, and water.', 'I packed, a hat sunglasses and water.', 'I packed a hat sunglasses, and, water.'],
        answer: 0,
        hint: 'Commas go between the items in a list.',
        why: 'The commas separate the three items: a hat, sunglasses, and water.',
      },
      {
        q: 'Which sentence correctly shows that someone is being spoken to?',
        options: ['Do you want pizza Lily?', 'Do you want pizza, Lily?', 'Do you, want pizza Lily?'],
        answer: 1,
        hint: 'Who is being talked to?',
        why: 'We are talking to Lily, so a comma sets off her name.',
      },
      {
        q: '"When the music started everyone cheered." Where does the comma go?',
        options: ['after "When"', 'after "started"', 'after "everyone"'],
        answer: 1,
        hint: 'Find where the introductory part ends.',
        why: '"When the music started" is the introductory part, so the comma goes after *started*.',
      },
    ],
  },
  {
    id: 'context-clues',
    topic: 'Context clues',
    standard: 'L.5.4a',
    goal: 'I can figure out an unfamiliar word by using the words around it.',
    hook: {
      text: '*The puppy was so exhausted after the long walk that it fell asleep right away.*',
      ask: "Don't know the word *exhausted*? What could it mean?",
      reveal: 'The puppy *fell asleep right away* after a *long walk*. That clue tells us *exhausted* means **very tired**. The words around a word are called **context clues**.',
    },
    learn: [
      { text: 'There are four common kinds of context clues:' },
      { h: 'Definition', text: 'The sentence tells you the meaning.', ex: ['A **nocturnal** animal, one that is active at night, sleeps during the day.'] },
      { h: 'Synonym', text: 'A word with a similar meaning is nearby.', ex: ['The room was **spotless**; it was perfectly clean.'] },
      { h: 'Contrast', text: 'Words like *but*, *however* or *unlike* show an opposite.', ex: ['Unlike her **timid** brother, Mia was bold. (So *timid* means shy.)'] },
      { h: 'Example', text: 'Examples show what the word means.', ex: ['**Citrus** fruits, such as oranges, lemons and limes, are full of vitamin C.'] },
      {
        h: 'Three steps',
        text: '1. Reread the sentence and the ones around it.\n2. Look for signal words: *is, means, or, like, but, unlike, such as*.\n3. Try your guess in place of the word. Does it make sense?',
      },
    ],
    watch: 'The clue is not always in the same sentence. Sometimes it is in the next sentence, so keep reading.',
    tryIt: [
      {
        q: '"The desert was arid; it had not rained there for months." What does "arid" mean?',
        options: ['very dry', 'very cold', 'very crowded'],
        answer: 0,
        hint: 'What happens to land when it does not rain for months?',
        why: 'No rain for months means the land is very dry. *Arid* means very dry.',
      },
      {
        q: '"Unlike the noisy crowd outside, the library was tranquil." What does "tranquil" mean?',
        options: ['busy', 'calm and quiet', 'dark'],
        answer: 1,
        hint: '"Unlike" signals an opposite of "noisy".',
        why: '*Unlike* shows a contrast with *noisy*, so *tranquil* means calm and quiet.',
      },
      {
        q: '"Mia felt elated when she heard she had won first prize. She jumped up and down and screamed with joy." What does "elated" mean?',
        options: ['very happy', 'nervous', 'sleepy'],
        answer: 0,
        hint: 'Look at the next sentence.',
        why: 'She *jumped up and down and screamed with joy*, so *elated* means very happy. The clue was in the next sentence!',
      },
    ],
  },
  {
    id: 'roots-affixes',
    topic: 'Greek and Latin roots and affixes',
    standard: 'L.5.4b',
    goal: 'I can break long words into parts to figure out what they mean.',
    hook: {
      text: '**tele** + **phone**',
      ask: '*Tele* means "far" and *phone* means "sound." So what is a telephone?',
      reveal: 'A telephone carries **sound from far away**! Many English words are built from Greek and Latin parts. If you know the parts, you can figure out the word.',
    },
    learn: [
      {
        h: 'Word parts',
        text: 'A **prefix** comes at the start, the **root** is the core, and a **suffix** comes at the end.\n*un + believ + able* → not able to be believed',
      },
      {
        h: 'Roots to know',
        ex: [
          '**tele** = far (telescope, television)',
          '**graph** = write or draw (autograph, paragraph)',
          '**bio** = life (biology, biography)',
          '**auto** = self (automatic, autograph)',
          '**port** = carry (transport, portable)',
          '**spect** = look (inspect, spectator)',
          '**dict** = say (predict, dictionary)',
        ],
      },
      {
        h: 'Prefixes and suffixes to know',
        ex: [
          '**re-** = again (redo, rewrite)',
          '**un-, in-, im-** = not (unhappy, invisible, impossible)',
          '**pre-** = before (preview, predict)',
          '**-able, -ible** = can be (readable, visible)',
          '**-less** = without (fearless)',
          '**-ology** = the study of (biology)',
        ],
      },
    ],
    watch: 'Not every word that starts with the same letters has that prefix. *Uncle* does not mean "not cle"! Always check that your meaning makes sense.',
    tryIt: [
      {
        q: '"Spect" means "look." What is a spectator?',
        options: ['someone who watches', 'someone who cooks', 'someone who builds'],
        answer: 0,
        hint: 'What does a spectator do with their eyes?',
        why: '*Spect* means look, so a spectator is someone who watches, like a fan at a game.',
      },
      {
        q: 'Which word means "able to be carried"?',
        options: ['portable', 'report', 'import'],
        answer: 0,
        hint: 'Look for "port" (carry) plus "-able" (can be).',
        why: '*Port* (carry) + *-able* (can be) = portable, able to be carried.',
      },
      {
        q: '"Pre" means "before" and "dict" means "say." What does "predict" mean?',
        options: ['to say something will happen before it happens', 'to say something again', 'to write something down'],
        answer: 0,
        hint: 'Put "before" and "say" together.',
        why: 'To predict is to say what will happen before it happens.',
      },
    ],
  },
  {
    id: 'similes-metaphors',
    topic: 'Similes and metaphors',
    standard: 'L.5.5a',
    goal: 'I can explain what a simile or a metaphor really means.',
    hook: {
      text: '*Her voice was as sweet as honey.*',
      ask: 'Is her voice really made of honey?',
      reveal: 'No! The writer is **comparing** her voice to honey to show that it sounds lovely. Writers use comparisons like this to paint pictures in your mind.',
    },
    learn: [
      {
        h: 'Simile: compares using "like" or "as"',
        ex: ['He ran **like** the wind. (He ran very fast.)', 'The snow was **as** white **as** cotton.'],
      },
      {
        h: 'Metaphor: says one thing IS another',
        text: 'No *like* or *as*.',
        ex: ['The stadium **was** a sea of light-sticks. (There were so many glowing light-sticks that they looked like ocean waves.)'],
      },
      {
        h: 'How to figure it out',
        text: '1. What two things are being compared?\n2. What do they have in common?\n3. What is the writer telling us?',
      },
    ],
    watch: 'Not every sentence with "like" is a simile. *I like pizza* is not comparing anything.',
    tryIt: [
      {
        q: '"The classroom was a zoo after lunch." What does this mean?',
        options: ['There were animals in the classroom.', 'The classroom was wild and noisy.', 'The class went to the zoo.'],
        answer: 1,
        hint: 'What is a zoo like? Loud? Busy?',
        why: 'It is a metaphor. A zoo is wild and noisy, so the classroom was wild and noisy.',
      },
      {
        q: 'Which sentence is a simile?',
        options: ['My brother is a couch potato.', 'The snow was as white as cotton.', 'I like cotton candy.'],
        answer: 1,
        hint: 'Look for a comparison that uses "like" or "as".',
        why: '*As white as cotton* compares snow and cotton using *as*. The first one is a metaphor, and the last one is not a comparison.',
      },
      {
        q: '"Mia\'s smile was sunshine on a rainy day." What does this suggest?',
        options: ['Her smile made people feel happy.', 'It was raining.', 'Her smile was yellow.'],
        answer: 0,
        hint: 'How does sunshine feel on a rainy day?',
        why: 'Sunshine on a rainy day cheers people up, so her smile made people happy.',
      },
    ],
  },
  {
    id: 'idioms',
    topic: 'Idioms, adages and proverbs',
    standard: 'L.5.5b',
    goal: "I can explain sayings that don't mean exactly what their words say.",
    hook: {
      text: '*"It\'s raining cats and dogs!"*',
      ask: 'If you look outside, will you see cats and dogs falling?',
      reveal: 'Of course not! It means it is **raining very hard**. A phrase like this is called an **idiom**.',
    },
    learn: [
      {
        h: 'Idioms',
        text: 'The meaning is different from the words.',
        ex: [
          '**Break a leg!** = Good luck! (said before a show)',
          '**A piece of cake** = very easy',
          '**Under the weather** = feeling sick',
        ],
      },
      {
        h: 'Adages and proverbs',
        text: 'Old, wise sayings that give advice or tell a truth about life. *Adage* and *proverb* mean almost the same thing.',
        ex: [
          '**Practice makes perfect.**',
          "**Don't count your chickens before they hatch.** = Don't be sure of something before it happens.",
          '**The early bird catches the worm.** = People who start early often succeed.',
        ],
      },
      { text: 'Many languages have sayings like these. Use context clues to figure out what a saying means.' },
    ],
    watch: "Don't read idioms word for word. Ask: what would this mean in real life?",
    tryIt: [
      {
        q: '"The math test was a piece of cake." What does this mean?',
        options: ['The test was very easy.', 'The test was about cake.', 'The test was very hard.'],
        answer: 0,
        hint: 'Is eating cake easy or hard?',
        why: '*A piece of cake* means very easy.',
      },
      {
        q: 'Before her dance show, Mia\'s friend said, "Break a leg!" What did her friend mean?',
        options: ['Good luck!', 'Be careful not to fall.', 'The show is cancelled.'],
        answer: 0,
        hint: 'People say it before a show.',
        why: '*Break a leg* is an idiom that means good luck.',
      },
      {
        q: 'Which proverb means "Don\'t be sure of something before it happens"?',
        options: ['Practice makes perfect.', "Don't count your chickens before they hatch.", 'The early bird catches the worm.'],
        answer: 1,
        hint: 'Eggs might not all hatch!',
        why: 'You should not count chickens before they hatch, because some eggs might not hatch.',
      },
    ],
  },
  {
    id: 'word-relationships',
    topic: 'Synonyms, antonyms and homographs',
    standard: 'L.5.5c',
    goal: 'I can use synonyms, antonyms and homographs to understand words better.',
    hook: {
      text: '*"Please don\'t tear the paper," said Mia, wiping a tear from her eye.*',
      ask: 'The word *tear* appears twice. Does it mean the same thing both times?',
      reveal: 'No! The first *tear* (rhymes with *bear*) means to rip. The second *tear* (rhymes with *ear*) is a drop from your eye. Same spelling, different words!',
    },
    learn: [
      {
        h: 'Synonyms: similar meanings',
        ex: ['huge, enormous, gigantic', 'glad, happy, thrilled'],
        text: 'Writers choose synonyms to avoid repeating words and to pick the exact feeling.',
      },
      { h: 'Antonyms: opposite meanings', ex: ['brave / cowardly', 'ancient / modern'] },
      {
        h: 'Homographs: same spelling, different meaning',
        text: 'Sometimes they sound different too. Use the sentence to tell which meaning is meant.',
        ex: ['**bat**: a flying animal / a baseball bat', '**tear**: to rip / a drop from your eye', '**wind**: moving air / to turn a key around'],
      },
    ],
    watch: 'Synonyms are not always perfect swaps. *Thin* and *skinny* are synonyms, but "a thin book" sounds right and "a skinny book" sounds strange.',
    tryIt: [
      {
        q: 'Which word is a synonym for "enormous"?',
        options: ['tiny', 'gigantic', 'quiet'],
        answer: 1,
        hint: 'Synonym = similar meaning.',
        why: '*Enormous* and *gigantic* both mean very big.',
      },
      {
        q: 'Which word is an antonym for "ancient"?',
        options: ['old', 'modern', 'historic'],
        answer: 1,
        hint: 'Antonym = opposite.',
        why: '*Ancient* means very old, so the opposite is *modern*.',
      },
      {
        q: '"The wind was too strong, so we couldn\'t fly the kite." Which meaning of "wind" is used?',
        options: ['moving air', 'to turn something around and around', 'a long, curving road'],
        answer: 0,
        hint: 'What makes a kite fly?',
        why: 'A kite flies in moving air, so *wind* here means moving air.',
      },
    ],
  },
  {
    id: 'inferences',
    topic: 'Making inferences and quoting the text',
    standard: 'RL.5.1 · RI.5.1',
    goal: 'I can make an inference and point to the exact words that prove it.',
    hook: {
      text: '*Leo dragged his feet into the kitchen. He dropped his backpack, sighed, and stared at his report card.*',
      ask: 'How does Leo feel?',
      reveal: 'The text never says "sad," but you can tell he is **upset**. You just made an **inference**!',
    },
    learn: [
      {
        h: 'Inference = clues in the text + what you already know',
        text: 'Readers are like detectives. The author gives clues, and you put them together.',
      },
      {
        h: 'Explicit or inferred?',
        text: '**Explicit** means the text says it directly. An **inference** is something you figure out.',
        ex: ['Explicit: Leo dropped his backpack.', 'Inference: Leo is upset about his report card.'],
      },
      {
        h: 'Prove it with a quote',
        text: "Copy the author's exact words inside quotation marks.",
        ex: ['I can infer that Leo is upset because the text says he "sighed" and "dragged his feet."'],
      },
    ],
    watch: 'Quote exactly. Copy the words; do not change them. And make sure your quote really supports your idea.',
    tryIt: [
      {
        q: '"Ana grabbed an umbrella and her raincoat before heading out the door." What can you infer?',
        options: ['The weather is rainy.', 'Ana is going swimming.', 'It is a sunny day.'],
        answer: 0,
        hint: 'Why would someone take an umbrella and a raincoat?',
        why: 'An umbrella and a raincoat are clues that it is raining.',
      },
      {
        q: '"When the bell rang, the students cheered and ran outside to the playground." Which quote best shows the students were happy?',
        options: ['"the bell rang"', '"the students cheered"', '"to the playground"'],
        answer: 1,
        hint: 'Which words show a feeling?',
        why: 'People cheer when they are happy, so "the students cheered" is the best evidence.',
      },
      {
        q: '"Sam\'s dog wagged its tail and barked at the door." Which statement is EXPLICIT (said directly)?',
        options: ['The dog barked at the door.', 'Someone is probably at the door.', 'The dog is excited to see someone.'],
        answer: 0,
        hint: 'Which one does the text actually say?',
        why: 'The text directly says the dog barked at the door. The other two are inferences.',
      },
    ],
  },
  {
    id: 'main-ideas',
    topic: 'Main ideas and key details',
    standard: 'RI.5.2',
    goal: 'I can find the main ideas of a nonfiction text and the details that support them.',
    hook: {
      text: 'Picture a table. The **tabletop** is the main idea. The **legs** are the details holding it up.',
      ask: 'What happens to a table with no legs?',
      reveal: 'It falls down! A main idea needs details to support it, and details need a main idea to hold them together.',
    },
    learn: [
      {
        h: 'Main idea vs. details',
        text: 'The **main idea** is what the text is mostly about, the big point. **Details** are facts, examples and numbers that support it.',
      },
      {
        h: 'Longer texts have more than one main idea',
        text: 'Often there is one main idea per paragraph. Read this:',
        passage:
          'Honeybees are important to people. They pollinate many fruits and vegetables we eat, such as apples and almonds. They also make honey and beeswax.\nBut honeybees are in danger. Some chemicals used on farms harm bees, and diseases have killed many hives. Scientists are working to protect them.',
        ex: [
          'Main idea 1: Honeybees are important to people. (Details: they pollinate food and make honey.)',
          'Main idea 2: Honeybees are in danger. (Details: chemicals and diseases.)',
        ],
      },
      {
        h: 'How to find main ideas',
        text: 'Look at the title and headings, the first and last sentences of each paragraph, and what the details have in common.',
      },
      {
        h: 'Summary',
        text: 'A summary gives the main ideas and the most important details, in your own words, with no opinions.',
      },
    ],
    watch: 'An interesting detail is not the main idea. "Honeybees have five eyes" is a fun fact, but it is not what the text is mostly about.',
    tryIt: [
      {
        passage: 'Many people think of deserts as empty, but they are full of life. Cactuses store water in their thick stems. Animals like the fennec fox have big ears that help them stay cool.',
        q: 'What is the main idea?',
        options: ['Deserts are full of life.', 'Cactuses have thick stems.', 'Fennec foxes have big ears.'],
        answer: 0,
        hint: 'What are all the details about?',
        why: 'Every detail shows living things in the desert, so the main idea is that deserts are full of life.',
      },
      {
        passage: 'Many people think of deserts as empty, but they are full of life. Cactuses store water in their thick stems. Animals like the fennec fox have big ears that help them stay cool.',
        q: 'Which detail supports the main idea?',
        options: ['Cactuses store water in their thick stems.', 'Many people think of deserts as empty.', 'Deserts are very large.'],
        answer: 0,
        hint: 'Which detail shows life in the desert?',
        why: 'A cactus storing water is an example of life in the desert. The text does not say that deserts are large.',
      },
      {
        passage: 'Honeybees are important to people. They pollinate many fruits and vegetables we eat, such as apples and almonds. They also make honey and beeswax.\nBut honeybees are in danger. Some chemicals used on farms harm bees, and diseases have killed many hives. Scientists are working to protect them.',
        q: 'Which is the best summary of this text?',
        options: [
          'Honeybees are important because they pollinate food and make honey, but chemicals and diseases put them in danger.',
          'Bees make honey and beeswax.',
          'I think bees are scary.',
        ],
        answer: 0,
        hint: 'A summary includes BOTH main ideas and no opinions.',
        why: 'The first choice includes both main ideas. The second leaves out the danger, and the third is an opinion.',
      },
    ],
  },
  {
    id: 'text-structure',
    topic: 'Text structure: cause and effect, compare and contrast, problem and solution',
    standard: 'RI.5.5',
    goal: 'I can tell how a nonfiction text is organized.',
    hook: {
      text: 'A recipe tells you the steps in order. A news story about a flood explains what caused it.',
      ask: 'Why would writers organize texts in different ways?',
      reveal: 'Because they have different jobs! The way a text is organized is called its **text structure**. Spotting it helps you understand and remember what you read.',
    },
    learn: [
      { h: 'Chronological (time order)', text: 'Events or steps in order.', ex: ['Signal words: *first, next, then, finally, in 1776*'] },
      { h: 'Compare and contrast', text: 'How things are alike and different.', ex: ['Signal words: *both, same, however, unlike, but, while*'] },
      { h: 'Cause and effect', text: 'Why something happens and what happens because of it.', ex: ['Signal words: *because, so, as a result, therefore*'] },
      { h: 'Problem and solution', text: 'A problem and how people solved it.', ex: ['Signal words: *problem, solved, one solution, to fix this*'] },
    ],
    watch: 'Signal words are clues, not proof. Ask yourself: what is the author MOSTLY doing in this text?',
    tryIt: [
      {
        q: '"Because it rained for five days, the river flooded. As a result, many roads were closed." What is the text structure?',
        options: ['cause and effect', 'compare and contrast', 'chronological'],
        answer: 0,
        hint: 'Look for "because" and "as a result".',
        why: 'The rain caused the flood, and the flood caused the roads to close. That is cause and effect.',
      },
      {
        q: '"Frogs and toads are both amphibians. However, frogs have smooth, wet skin, while toads have dry, bumpy skin." What is the text structure?',
        options: ['problem and solution', 'compare and contrast', 'cause and effect'],
        answer: 1,
        hint: 'Look for "both", "however" and "while".',
        why: 'It tells how frogs and toads are alike and different: compare and contrast.',
      },
      {
        q: '"First, the seed is planted. Next, it grows roots. Then, a stem grows toward the sun. Finally, the plant blooms." What is the text structure?',
        options: ['chronological', 'problem and solution', 'cause and effect'],
        answer: 0,
        hint: 'Look for "first", "next", "then" and "finally".',
        why: 'The steps are in time order, so it is chronological.',
      },
    ],
  },
  {
    id: 'theme',
    topic: 'Theme of a story',
    standard: 'RL.5.2',
    goal: 'I can find the theme of a story from how the characters respond to challenges.',
    hook: {
      text: '*Jin wanted to make the school dance team, but she fell during her tryout. Everyone laughed. That night, she practiced her routine again and again. At the next tryout, she danced perfectly and made the team.*',
      ask: 'What lesson about life does this story teach?',
      reveal: 'Hard work and practice can help you overcome failure. That lesson is the story\'s **theme**.',
    },
    learn: [
      {
        h: 'Theme vs. topic',
        text: 'The **topic** is what the story is about, usually one or two words: *friendship*. The **theme** is the lesson about life, in a full sentence: *True friends help each other even when it is hard.*',
      },
      {
        h: 'Clues to the theme',
        text: 'Ask yourself:',
        ex: ['What challenge does the main character face?', 'How does the character respond?', 'What changes, or what does the character learn by the end?'],
      },
    ],
    watch: 'A theme is a lesson about life in general, not just about this story. *Jin made the dance team* is a plot event, not a theme.',
    tryIt: [
      {
        passage: 'Ben found a wallet full of money on the sidewalk. He really wanted a new video game. But he thought about how worried the owner must be, so he took the wallet to the police station. The owner thanked him with a big smile, and Ben felt proud.',
        q: 'What is the theme?',
        options: ['Doing the right thing feels good, even when it is hard.', 'Video games are expensive.', 'Ben found a wallet.'],
        answer: 0,
        hint: 'What did Ben learn from his choice?',
        why: 'Ben chose to be honest even though he wanted the money, and he felt proud. That is the lesson.',
      },
      {
        passage: 'Ben found a wallet full of money on the sidewalk. He really wanted a new video game. But he thought about how worried the owner must be, so he took the wallet to the police station. The owner thanked him with a big smile, and Ben felt proud.',
        q: 'What challenge does Ben face?',
        options: ["deciding whether to keep money that isn't his", 'finding his lost dog', 'losing a video game'],
        answer: 0,
        hint: 'What did Ben have to decide?',
        why: 'He wanted a video game, but the money belonged to someone else.',
      },
      {
        q: 'Which one is a theme, not a topic?',
        options: ['honesty', 'Being honest is better than getting what you want.', 'wallets'],
        answer: 1,
        hint: 'A theme is a full sentence about life.',
        why: '*Honesty* is a topic. The full sentence is a theme because it gives a lesson.',
      },
    ],
  },
  {
    id: 'compare-characters',
    topic: 'Comparing characters, settings and events',
    standard: 'RL.5.3',
    goal: 'I can compare two characters using specific details from the story.',
    hook: {
      text: '*On the morning of the talent show, Ava and Kai found out the piano was broken. Ava burst into tears. "We\'ll have to quit!" she cried. Kai took a deep breath. "Let\'s sing without music," he said. "We know the song by heart."*',
      ask: 'Ava and Kai face the same problem. How do they react differently?',
      reveal: 'Ava panics, but Kai stays calm and makes a plan. Comparing how characters react is a great way to understand them.',
    },
    learn: [
      { h: 'Compare and contrast', text: '**Compare** = how they are alike. **Contrast** = how they are different.' },
      {
        h: 'What to look at',
        ex: ['what characters **say**, **do**, **think** and **feel**', 'how they respond to the **same problem**', 'settings: **where** and **when**, and how they change the mood'],
      },
      {
        h: 'Answer with details',
        text: 'Use specific details from the story.',
        ex: ['*Both Ava and Kai are in the talent show, but Ava panics when things go wrong, while Kai stays calm and makes a plan.*'],
      },
    ],
    watch: 'Don\'t just say "they are different." Show HOW, with details from the story.',
    tryIt: [
      {
        passage: `On the morning of the talent show, Ava and Kai found out the piano was broken. Ava burst into tears. "We'll have to quit!" she cried. Kai took a deep breath. "Let's sing without music," he said. "We know the song by heart."`,
        q: 'How are Ava and Kai alike?',
        options: ['They are both in the talent show.', 'They both cry.', 'They both want to quit.'],
        answer: 0,
        hint: 'What is true about BOTH of them?',
        why: 'They are both performing in the talent show. Only Ava cries and wants to quit.',
      },
      {
        passage: `On the morning of the talent show, Ava and Kai found out the piano was broken. Ava burst into tears. "We'll have to quit!" she cried. Kai took a deep breath. "Let's sing without music," he said. "We know the song by heart."`,
        q: 'How are Ava and Kai different?',
        options: ['Ava gets upset, but Kai stays calm.', 'Ava sings, but Kai plays drums.', 'Ava is older than Kai.'],
        answer: 0,
        hint: 'Think about how each one reacts to the broken piano.',
        why: 'Ava bursts into tears, while Kai takes a deep breath and makes a plan.',
      },
      {
        passage: `On the morning of the talent show, Ava and Kai found out the piano was broken. Ava burst into tears. "We'll have to quit!" she cried. Kai took a deep breath. "Let's sing without music," he said. "We know the song by heart."`,
        q: 'Which detail BEST shows that Kai stays calm?',
        options: ['"Kai took a deep breath."', '"the piano was broken"', '"Ava burst into tears"'],
        answer: 0,
        hint: 'Which detail is about Kai?',
        why: 'Taking a deep breath shows Kai calming himself before making a plan.',
      },
    ],
  },
  {
    id: 'point-of-view',
    topic: 'Point of view and the narrator',
    standard: 'RL.5.6',
    goal: 'I can tell who is telling a story and explain how that changes what we learn.',
    hook: {
      text: 'The cat says: *"I just wanted to play!"*\nThe mouse says: *"A giant monster chased me!"*',
      ask: 'Same event. Why do the two stories sound so different?',
      reveal: 'Because of **point of view**! Who tells the story changes how the events are described.',
    },
    learn: [
      {
        h: 'First person',
        text: 'The narrator is a character in the story and uses *I, me, we*. We only know what that character sees, thinks and feels.',
        ex: ['*I was SO nervous on stage. My hands shook, and the lights were blinding.*'],
      },
      {
        h: 'Third person',
        text: 'The narrator is outside the story and uses *he, she, they*. The narrator may tell us what one character thinks, or what many characters think.',
        ex: ['*Mia walked onto the stage. The crowd cheered as the lights came on.*'],
      },
      {
        h: 'Why it matters',
        text: "A narrator's feelings color how events are described. A nervous narrator makes a scene feel scary. A proud narrator makes it feel exciting.",
      },
      {
        h: 'Second person (rare)',
        text: 'Uses *you*, as if the reader is the character. It is common in instructions, like a recipe, but rare in stories.',
      },
    ],
    watch: 'The word *I* inside quotation marks does not make a story first person. Look at who is telling the story OUTSIDE the quotes.',
    tryIt: [
      {
        q: '"I grabbed my bag and ran to catch the bus." What point of view is this?',
        options: ['first person', 'second person', 'third person'],
        answer: 0,
        hint: 'Who is telling it? Look for I, me or we.',
        why: 'The narrator uses *I* and *my*, so it is first person.',
      },
      {
        q: '"Lily smiled. She knew her brother had planned the surprise party." What point of view is this?',
        options: ['first person', 'second person', 'third person'],
        answer: 2,
        hint: 'The narrator uses "she".',
        why: 'The narrator is outside the story and uses *she*, so it is third person.',
      },
      {
        q: 'A story about a soccer game is told by the goalie of the team that lost. How might that change the story?',
        options: [
          'It would probably focus on how disappointing the loss felt.',
          'It would only describe the weather.',
          "It would describe the winning team's celebration in their locker room.",
        ],
        answer: 0,
        hint: 'How would the losing goalie feel?',
        why: 'The losing goalie would describe the game through their disappointment. They would not be in the winning team\'s locker room.',
      },
    ],
  },
]

export function lessonForTopic(topic) {
  return US_ENGLISH_LESSONS.find((l) => l.topic === topic) || null
}
