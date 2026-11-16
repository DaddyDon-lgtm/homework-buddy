// US Social Studies lessons, Grade 5, Colorado Academic Standards (2022).
// Same shape as usEnglish.js: goal, hook, learn, watch out, three Try It questions.
// "topic" and "standard" must match the topic in topics.js so Practice opens the right round.

export const US_SOCIAL_LESSONS = [
  {
    id: `ss-native-nations`,
    topic: `American Indian nations before European contact`,
    standard: `History`,
    goal: `I can explain how American Indian nations used their environment to meet their needs.`,
    hook: {
      text: `Long before 1492, millions of people already lived in North America. They spoke hundreds of different languages.`,
      ask: `Do you think they all lived the same way? Why or why not?`,
      reveal: `No. North America has deserts, forests, grasslands and rainy coasts. Each nation adapted to the land around it, so homes, food and clothing were very different from place to place.`,
    },
    learn: [
      { text: `Historians group nations into **culture regions**: areas where the land and climate led to similar ways of life.` },
      {
        h: `Northeast Woodlands`,
        text: `Forests, rivers and lakes. Nations such as the **Haudenosaunee** (Iroquois) farmed and lived in **longhouses** made of wood and bark.`,
        ex: [`They grew the **Three Sisters**: corn, beans and squash, planted together so each plant helped the others.`],
      },
      {
        h: `Great Plains`,
        text: `Wide grasslands with few trees. Plains nations hunted **bison** (buffalo) and lived in **tipis** that could be taken down and moved.`,
        ex: [`One bison gave food, hides for tipis and clothing, and bones for tools.`],
      },
      {
        h: `Southwest`,
        text: `Dry desert land. The **Pueblo** peoples built homes of **adobe** (sun-dried clay bricks) and farmed corn using every bit of water carefully.`,
        ex: [`In Colorado, Ancestral Puebloans built homes into the cliffs at **Mesa Verde** more than 700 years ago.`],
      },
      {
        h: `Pacific Northwest`,
        text: `A rainy coast with huge forests. Nations such as the **Tlingit** fished for **salmon**, built **cedar plank houses**, and carved **totem poles**.`,
      },
      { h: `Putting it together`, fig: `regions` },
    ],
    watch: `There was no single “Indian” way of life. Hundreds of nations had their own languages, governments and traditions, and many of these nations still exist today.`,
    tryIt: [
      {
        q: `Why did Plains nations live in tipis that could be moved?`,
        options: [`They followed the bison herds.`, `They lived next to the ocean.`, `Their land was too cold for any homes.`, `They wanted to trade with Europeans.`],
        answer: 0,
        hint: `What animal did Plains nations depend on, and did it stay in one place?`,
        why: `Bison herds moved across the grasslands, so Plains nations needed homes they could take with them.`,
      },
      {
        q: `The Pueblo peoples built homes from adobe. What does this show?`,
        options: [`They copied European houses.`, `They used materials found in their dry environment.`, `They lived in a rainforest.`, `They moved to a new place every week.`],
        answer: 1,
        hint: `Adobe is made from clay and dried in the sun.`,
        why: `The desert had clay and lots of sun but few trees, so adobe was the smart building material there.`,
      },
      {
        q: `Which food was most important to Pacific Northwest nations like the Tlingit?`,
        options: [`bison`, `corn`, `salmon`, `rice`],
        answer: 2,
        hint: `They lived along rivers and the ocean coast.`,
        why: `The rivers and coast of the Pacific Northwest were full of salmon, the main food for nations there.`,
      },
    ],
  },
  {
    id: `ss-exploration`,
    topic: `European exploration and colonization`,
    standard: `History`,
    goal: `I can explain why Europeans explored and how contact changed life in the Americas.`,
    hook: {
      text: `In 1492, Christopher Columbus sailed west from Spain. He was trying to reach Asia.`,
      ask: `Did he reach Asia? What did he find instead?`,
      reveal: `No. He landed on islands in the Caribbean. Europeans did not know that two whole continents, the Americas, were in the way. And millions of people already lived there.`,
    },
    learn: [
      {
        h: `Why explore? The “three Gs”`,
        text: `Historians often sum up the reasons as **gold** (wealth and trade), **glory** (fame and power for their country) and **God** (spreading Christianity).`,
      },
      {
        h: `Who explored?`,
        text: `Spain, Portugal, France, England and the Netherlands all sent explorers.`,
        ex: [
          `**Spain**: Columbus (1492), then conquistadors who searched for gold.`,
          `**France**: Jacques Cartier explored the St. Lawrence River in Canada. The French traded for furs.`,
          `**England**: built colonies on the Atlantic coast, starting with Jamestown (1607).`,
        ],
      },
      {
        h: `The Columbian Exchange`,
        text: `Ships carried plants, animals and germs both ways across the Atlantic Ocean.`,
        ex: [
          `From the Americas to Europe: corn, potatoes, tomatoes, chocolate.`,
          `From Europe to the Americas: horses, cows, wheat, and diseases like **smallpox**.`,
        ],
        fig: `columbian`,
      },
    ],
    watch: `Diseases such as smallpox killed a very large share of American Indians, because their bodies had never met these germs before. This was one of the biggest changes caused by contact.`,
    tryIt: [
      {
        q: `Which is an example of “gold” as a reason to explore?`,
        options: [`Spreading a religion`, `Finding new trade routes to get rich`, `Winning fame for a king`, `Learning a new language`],
        answer: 1,
        hint: `“Gold” stands for money and wealth.`,
        why: `New trade routes meant riches, so that is the “gold” reason. Religion is “God,” and fame is “glory.”`,
      },
      {
        type: `sort`,
        q: `Which way did each one travel in the Columbian Exchange?`,
        items: [`🌽 corn`, `🐎 horses`, `🥔 potatoes`, `🌾 wheat`, `🍫 chocolate`, `🐄 cows`],
        buckets: [`Americas → Europe`, `Europe → Americas`],
        answers: [0, 1, 0, 1, 0, 1],
        hint: `Corn, potatoes and chocolate first grew in the Americas.`,
        why: `Corn, potatoes and chocolate (cacao) came from the Americas. Horses, wheat and cows were brought from Europe.`,
      },
      {
        q: `Why did smallpox harm American Indians so badly?`,
        options: [`They had never been exposed to it before.`, `It only made children sick.`, `Their villages were too cold.`, `They ate the wrong food.`],
        answer: 0,
        hint: `Think about what happens when a body meets a brand-new germ.`,
        why: `Smallpox was new to the Americas, so people had no protection against it, and it spread quickly.`,
      },
    ],
  },
  {
    id: `ss-colonies`,
    topic: `The Thirteen Colonies`,
    standard: `History`,
    goal: `I can compare the New England, Middle and Southern colonies.`,
    hook: {
      text: `*Colony A* has rocky soil, long cold winters, and great harbors.\n*Colony B* has rich soil, a long warm growing season, and wide rivers.`,
      ask: `Which colony would grow big farms of tobacco? Which would build ships and fish?`,
      reveal: `Colony B could grow big crops like tobacco and rice. Colony A would turn to fishing, shipbuilding and trade. **Geography** shaped how each colony made a living.`,
    },
    learn: [
      { text: `The 13 English colonies were along the Atlantic coast. **Jamestown, Virginia** (1607) was the first one that lasted. Historians group the colonies into three regions.`, fig: `colonies` },
      {
        h: `New England Colonies`,
        text: `Massachusetts, New Hampshire, Connecticut, Rhode Island. Rocky soil and cold winters, so people turned to **fishing, shipbuilding and trade**. Many settlers, like the Pilgrims and Puritans, came for religious reasons.`,
      },
      {
        h: `Middle Colonies`,
        text: `New York, New Jersey, Pennsylvania, Delaware. Good soil for wheat, so they were called the **“breadbasket” colonies**. People from many countries and religions lived here.`,
      },
      {
        h: `Southern Colonies`,
        text: `Maryland, Virginia, North Carolina, South Carolina, Georgia. Warm weather and a long growing season. Huge farms called **plantations** grew tobacco, rice and indigo to sell.`,
      },
    ],
    watch: `Southern plantations depended on the work of **enslaved Africans**, who were brought by force and had no freedom or pay. Slavery was legal in all 13 colonies, but it was largest in the South.`,
    tryIt: [
      {
        type: `sort`,
        q: `Put each colony in its region.`,
        items: [`Massachusetts`, `Pennsylvania`, `Virginia`, `Connecticut`, `New York`, `Georgia`],
        buckets: [`New England`, `Middle`, `Southern`],
        answers: [0, 1, 2, 0, 1, 2],
        hint: `Look back at the diagram: New England is farthest north, the Southern Colonies farthest south.`,
        why: `New England: Massachusetts, Connecticut. Middle: Pennsylvania, New York. Southern: Virginia, Georgia.`,
      },
      {
        q: `Why did New England depend on fishing and shipbuilding?`,
        options: [`The king did not allow farming there.`, `There were no trees.`, `It was too hot to farm.`, `Rocky soil and cold winters made big farms hard.`],
        answer: 3,
        hint: `Think about New England’s soil and weather.`,
        why: `Big farms were hard in rocky soil with short summers, so New Englanders used the ocean, harbors and forests instead.`,
      },
      {
        q: `What was a plantation?`,
        options: [`A small family garden`, `A ship that carried furs`, `A large farm that grew crops to sell`, `A church in New England`],
        answer: 2,
        hint: `Plantations were found in the Southern Colonies.`,
        why: `A plantation was a large farm that grew crops like tobacco or rice to sell.`,
      },
    ],
  },
  {
    id: `ss-rev-causes`,
    topic: `Causes of the American Revolution`,
    standard: `History`,
    goal: `I can explain why many colonists became angry with Britain.`,
    hook: {
      text: `Imagine your school makes a new rule: every student must pay for each sheet of paper. Students were never asked, and no student is on the school council.`,
      ask: `How would you feel? What would you say?`,
      reveal: `Many colonists felt the same way about British taxes. Their slogan was **“No taxation without representation.”** They had no members in Parliament, so they said Parliament had no right to tax them.`,
    },
    learn: [
      {
        h: `Why the taxes?`,
        text: `Britain won the **French and Indian War** (1754–1763) but was left with big debts. Parliament decided the colonies should help pay.`,
      },
      {
        h: `New taxes and laws`,
        text: `Colonists protested, and some taxes were canceled, but new ones kept coming.`,
        ex: [
          `**Stamp Act** (1765): a tax on printed paper, like newspapers and legal papers.`,
          `**Townshend Acts** (1767): taxes on glass, paint, paper and tea.`,
          `**Tea Act** (1773): helped a British company sell tea. Colonists saw it as a trick to make them accept the tea tax.`,
        ],
      },
      {
        h: `The conflict grows`,
        text: `Each side’s actions made the other side angrier.`,
        ex: [
          `**Boston Massacre** (1770): British soldiers fired into a crowd and killed five colonists.`,
          `**Boston Tea Party** (1773): colonists dumped 342 chests of tea into Boston Harbor.`,
          `**Intolerable Acts** (1774): Britain punished Massachusetts and closed Boston Harbor.`,
        ],
      },
      { h: `The road to war`, fig: `causes-timeline` },
    ],
    watch: `Not every colonist wanted to break away. **Patriots** wanted independence, **Loyalists** stayed loyal to Britain, and many people were somewhere in between.`,
    tryIt: [
      {
        q: `What did “No taxation without representation” mean?`,
        options: [`Colonists never wanted to pay any taxes.`, `Only rich people should pay taxes.`, `Colonists should not pay taxes passed by a Parliament where they had no members.`, `The king should vote on all taxes.`],
        answer: 2,
        hint: `“Representation” means having someone speak and vote for you.`,
        why: `The colonists’ complaint was about who made the tax. They had no members in Parliament to vote for them.`,
      },
      {
        q: `Why did Parliament start taxing the colonies after 1763?`,
        options: [`To pay debts from the French and Indian War`, `To build schools in the colonies`, `To punish the Boston Tea Party`, `To pay for the Declaration of Independence`],
        answer: 0,
        hint: `What war ended in 1763?`,
        why: `The French and Indian War left Britain with big debts, so Parliament taxed the colonies to help pay.`,
      },
      {
        type: `order`,
        q: `Put these events in order, from first to last.`,
        items: [`Stamp Act`, `Boston Massacre`, `Boston Tea Party`, `Intolerable Acts`],
        show: [2, 0, 3, 1],
        hint: `Taxes came first. The Intolerable Acts were a punishment for something.`,
        why: `Stamp Act (1765), Boston Massacre (1770), Boston Tea Party (1773), Intolerable Acts (1774), which punished Boston for the Tea Party.`,
      },
    ],
  },
  {
    id: `ss-declaration`,
    topic: `The Declaration of Independence`,
    standard: `History · Civics`,
    goal: `I can explain the main ideas of the Declaration of Independence.`,
    hook: {
      text: `*“We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.”*`,
      ask: `This famous sentence is from 1776. What does it say every person has?`,
      reveal: `It says every person is born with rights that no government can take away: **life, liberty (freedom), and the pursuit of happiness**. *Unalienable* means “cannot be taken away.”`,
    },
    learn: [
      {
        h: `Who and when`,
        text: `The **Second Continental Congress** approved it on **July 4, 1776**. **Thomas Jefferson** wrote the first draft. Americans celebrate July 4 as Independence Day.`,
      },
      {
        h: `Three big parts`,
        ex: [
          `**Big ideas**: people have natural rights, and a government gets its power from the **consent of the governed** (the people agree to it).`,
          `**Complaints**: a long list of wrongs by King George III, such as taxing the colonies without their consent.`,
          `**The declaration itself**: the colonies are now free and independent states.`,
        ],
        fig: `declaration`,
      },
      {
        h: `When a government breaks the deal`,
        text: `The Declaration says that if a government destroys people’s rights, the people have the right to change it or make a new one.`,
      },
    ],
    watch: `“All men are created equal” was a big promise, but in 1776 it did not include everyone. Enslaved people, women and American Indians were left out. Americans have worked for a long time since then to make the promise true for all.`,
    tryIt: [
      {
        q: `Who wrote the first draft of the Declaration of Independence?`,
        options: [`George Washington`, `Benjamin Franklin`, `Thomas Jefferson`, `King George III`],
        answer: 2,
        hint: `He later became the third president.`,
        why: `Thomas Jefferson wrote the first draft. Franklin and others helped edit it.`,
      },
      {
        q: `What does “consent of the governed” mean?`,
        options: [`The king chooses the laws.`, `Only soldiers can vote.`, `People must obey every law without question.`, `The government gets its power from the people.`],
        answer: 3,
        hint: `“Consent” means agreeing. Who are “the governed”?`,
        why: `The governed are the people. Their agreement is what gives a government the right to rule.`,
      },
      {
        q: `Why did the Declaration list complaints about King George III?`,
        options: [`To explain why the colonies were separating`, `To ask him for more taxes`, `To thank him for his help`, `To choose a new king`],
        answer: 0,
        hint: `If you were leaving, what would you need to explain?`,
        why: `The list of complaints gave the reasons for breaking away from Britain.`,
      },
    ],
  },
  {
    id: `ss-revwar`,
    topic: `The Revolutionary War`,
    standard: `History`,
    goal: `I can explain the key events of the Revolutionary War and how the Americans won.`,
    hook: {
      text: `In 1775, Britain had one of the strongest armies and the biggest navy in the world. The colonists had no regular army and very little money.`,
      ask: `How could the Americans possibly win?`,
      reveal: `They fought on their own land, had a strong leader in **George Washington**, refused to give up, and got help from **France**.`,
    },
    learn: [
      {
        h: `Key events`,
        fig: `revwar-timeline`,
        say: [
          `**1775, Lexington and Concord**: the first battles of the war.`,
          `**1777, Saratoga**: a big American win that convinced **France** to join the American side.`,
          `**1777–1778, Valley Forge**: Washington’s army survived a hard winter and trained to fight better.`,
          `**1781, Yorktown**: American and French forces trapped the British army, and it surrendered.`,
          `**1783, Treaty of Paris**: Britain recognized the United States as independent.`,
        ].join('. '),
      },
      {
        h: `American strengths`,
        text: `Fighting on home ground, a cause people believed in, Washington’s leadership, and help from France (soldiers, ships and money) and from Spain.`,
      },
    ],
    watch: `Many people helped who were not regular soldiers. Women ran farms and businesses, and some worked as nurses or spies. Thousands of Black soldiers fought for the Patriots, and many American Indian nations had to decide which side, if any, to support.`,
    tryIt: [
      {
        q: `Why was the Battle of Saratoga a turning point?`,
        options: [`It convinced France to help the Americans.`, `It ended the war.`, `It was the first battle of the war.`, `The British captured George Washington.`],
        answer: 0,
        hint: `What happened after the Americans won at Saratoga?`,
        why: `The win at Saratoga showed the Americans could beat the British, so France joined the war on their side.`,
      },
      {
        q: `Where did the British army surrender in 1781?`,
        options: [`Boston`, `Valley Forge`, `Lexington`, `Yorktown`],
        answer: 3,
        hint: `Look at the key events list for 1781.`,
        why: `American and French forces trapped the British at Yorktown, Virginia, where they surrendered in 1781.`,
      },
      {
        type: `order`,
        q: `Put these events of the war in order, from first to last.`,
        items: [`Lexington and Concord`, `Saratoga`, `Yorktown`, `Treaty of Paris`],
        show: [2, 3, 0, 1],
        hint: `The war began at Lexington and ended with a treaty.`,
        why: `Lexington and Concord (1775), Saratoga (1777), Yorktown (1781), Treaty of Paris (1783).`,
      },
    ],
  },
  {
    id: `ss-constitution`,
    topic: `From the Articles of Confederation to the Constitution`,
    standard: `History · Civics`,
    goal: `I can explain why the Articles of Confederation failed and how the Constitution fixed it.`,
    hook: {
      text: `Imagine a group project where every member must agree before anything happens, and no one is the leader. Nobody can make anyone do their part.`,
      ask: `What problems might happen?`,
      reveal: `Nothing would get done! That was the problem with America’s first government, the **Articles of Confederation**.`,
    },
    learn: [
      {
        h: `The Articles of Confederation (1781)`,
        text: `The states were afraid of a powerful government like the king’s, so they made the national government very weak.`,
        ex: [
          `Congress could **not collect taxes**, so it had very little money.`,
          `There was **no president** to carry out laws and **no national courts**.`,
          `Changing the Articles needed **all 13 states** to agree.`,
        ],
        fig: `articles-vs-constitution`,
      },
      {
        h: `Shays’ Rebellion (1786–1787)`,
        text: `Farmers in Massachusetts, angry about debts and taxes, rose up. The national government could do almost nothing. Many leaders decided the country needed a stronger government.`,
      },
      {
        h: `The Constitutional Convention (1787)`,
        text: `Delegates met in Philadelphia. George Washington led the meeting, and **James Madison** shaped so many ideas that he is called the “Father of the Constitution.” The Constitution begins with the words **“We the People.”**`,
      },
      {
        h: `The Great Compromise`,
        text: `Big states and small states disagreed about votes in Congress. The answer was two houses: the **Senate** (2 senators from every state) and the **House of Representatives** (more members for states with more people).`,
        fig: `compromise`,
      },
    ],
    watch: `The Constitution did not get rid of the states. It created **federalism**: power is shared between the national government and the state governments.`,
    tryIt: [
      {
        q: `What was a major weakness of the Articles of Confederation?`,
        options: [`The president had too much power.`, `The courts were too strong.`, `Congress could not collect taxes.`, `The states had no power.`],
        answer: 2,
        hint: `How would a government with no money manage?`,
        why: `Under the Articles, Congress could not collect taxes, so it could not pay its debts or an army.`,
      },
      {
        q: `What did the Great Compromise create?`,
        options: [`a king and a parliament`, `a Congress with two houses`, `13 separate countries`, `the Bill of Rights`],
        answer: 1,
        hint: `It solved an argument between big and small states about Congress.`,
        why: `It made two houses: the Senate, where every state is equal, and the House, which is based on population.`,
      },
      {
        q: `Why did Shays’ Rebellion worry many leaders?`,
        options: [`It showed the national government was too weak to keep order.`, `It showed the king was coming back.`, `It started the Revolutionary War.`, `It ended slavery.`],
        answer: 0,
        hint: `What could the national government do to stop it?`,
        why: `The national government could do almost nothing about the uprising, which showed it was too weak.`,
      },
    ],
  },
  {
    id: `ss-bill-of-rights`,
    topic: `The Bill of Rights`,
    standard: `Civics`,
    goal: `I can name rights protected by the Bill of Rights and explain why it was added.`,
    hook: {
      text: `In 1787, some Americans would not support the new Constitution. They said, “It makes a strong government, but where does it protect **our** rights?”`,
      ask: `What do you think they wanted added?`,
      reveal: `A list of rights the government cannot take away. In **1791**, the first ten amendments, called the **Bill of Rights**, were added to the Constitution.`,
    },
    learn: [
      { text: `An **amendment** is a change or addition to the Constitution.` },
      {
        h: `Some key rights`,
        ex: [
          `**1st Amendment**: freedom of religion, speech and the press, the right to gather peacefully, and the right to ask the government to change things (petition).`,
          `**2nd Amendment**: the right to keep and bear arms.`,
          `**4th Amendment**: protection from unreasonable searches. Police usually need a **warrant** from a judge.`,
          `**5th Amendment**: you do not have to be a witness against yourself.`,
          `**6th Amendment**: the right to a fast, fair trial and a lawyer.`,
          `**8th Amendment**: no cruel and unusual punishment.`,
        ],
        fig: `rights`,
      },
      {
        h: `Why it matters`,
        text: `These rights put limits on what the government can do. Courts decide what the rights mean in new situations.`,
      },
    ],
    watch: `Rights have limits. Freedom of speech does not protect threatening to hurt someone, for example. And rights come with responsibilities, like respecting other people’s rights.`,
    tryIt: [
      {
        q: `A newspaper prints a story criticizing the mayor. Which amendment protects the newspaper?`,
        options: [`1st`, `4th`, `6th`, `8th`],
        answer: 0,
        hint: `Which amendment includes freedom of the press?`,
        why: `The 1st Amendment protects freedom of speech and of the press.`,
      },
      {
        q: `What is an amendment?`,
        options: [`a kind of tax`, `a change or addition to the Constitution`, `a federal court`, `a state law`],
        answer: 1,
        hint: `The Bill of Rights is the first ten of them.`,
        why: `An amendment changes or adds to the Constitution. The first ten are the Bill of Rights.`,
      },
      {
        q: `Police want to search a house. Which amendment says they usually need a warrant?`,
        options: [`1st`, `2nd`, `5th`, `4th`],
        answer: 3,
        hint: `It protects against unreasonable searches.`,
        why: `The 4th Amendment protects people from unreasonable searches, so police usually need a warrant.`,
      },
    ],
  },
  {
    id: `ss-branches`,
    topic: `The three branches of government`,
    standard: `Civics`,
    goal: `I can explain what each branch of government does and how checks and balances work.`,
    hook: {
      text: `Imagine one student could make the class rules, decide who broke them, and choose the punishments, all alone.`,
      ask: `Is that fair? What could go wrong?`,
      reveal: `That one person would have too much power. The Constitution splits power into **three branches** so no part of government can become too powerful. This is called **separation of powers**.`,
    },
    learn: [
      {
        h: `Legislative branch: makes laws`,
        text: `**Congress**, which is the Senate plus the House of Representatives. It meets in the Capitol building.`,
      },
      {
        h: `Executive branch: carries out laws`,
        text: `The **President**, the Vice President, and government departments. The President is also commander in chief of the military.`,
      },
      {
        h: `Judicial branch: explains laws`,
        text: `The **Supreme Court** and other federal courts decide what laws mean and whether they follow the Constitution.`,
      },
      {
        h: `Checks and balances`,
        text: `Each branch can limit the others.`,
        ex: [
          `The President can **veto** (reject) a bill passed by Congress.`,
          `Congress can **override** a veto with a two-thirds vote in both houses.`,
          `The Supreme Court can rule that a law goes against the Constitution.`,
          `The Senate approves or rejects the President’s choices for Supreme Court justices.`,
        ],
        fig: `branches`,
      },
    ],
    watch: `It is easy to mix up the branches. Remember: **L**egislative = **L**aws are made. **E**xecutive = **E**nforces (carries out) the laws. **J**udicial = **J**udges.`,
    tryIt: [
      {
        type: `sort`,
        q: `Which branch does each job?`,
        items: [`Makes laws`, `Vetoes a bill`, `Decides if a law follows the Constitution`, `Commands the military`, `Overrides a veto`, `Explains what laws mean`],
        buckets: [`Legislative`, `Executive`, `Judicial`],
        answers: [0, 1, 2, 1, 0, 2],
        hint: `L for Laws (Congress), E for Enforces (the President), J for Judges (the courts).`,
        why: `Legislative (Congress): makes laws, overrides vetoes. Executive (the President): vetoes bills, commands the military. Judicial (the courts): explains laws and decides if they follow the Constitution.`,
      },
      {
        q: `The President vetoes a bill that Congress passed. This is an example of:`,
        options: [`federalism`, `checks and balances`, `an amendment`, `a tax`],
        answer: 1,
        hint: `One branch is limiting another branch.`,
        why: `A veto lets the executive branch check the legislative branch. That is checks and balances.`,
      },
      {
        q: `Who decides whether a law follows the Constitution?`,
        options: [`the President`, `the Senate`, `a state governor`, `the Supreme Court`],
        answer: 3,
        hint: `J for Judges.`,
        why: `The judicial branch, led by the Supreme Court, decides whether laws follow the Constitution.`,
      },
    ],
  },
  {
    id: `ss-citizens`,
    topic: `Rights and responsibilities of citizens`,
    standard: `Civics`,
    goal: `I can explain the rights and responsibilities of citizens and ways people take part in their community.`,
    hook: {
      text: `The swings at the neighborhood park have been broken for months. Lots of kids are upset, but nobody does anything.`,
      ask: `What could a kid do to help get them fixed?`,
      reveal: `Kids can write to the city council, start a **petition**, speak at a public meeting, or get friends to help. These are all ways of taking part in **civic life**.`,
    },
    learn: [
      {
        h: `Who is a citizen?`,
        text: `A person born in the United States is a US citizen. People from other countries can become citizens through **naturalization**, which includes passing a test on US history and government.`,
      },
      {
        h: `Rights`,
        text: `Examples: freedom of speech and religion, a fair trial, and, for citizens 18 and older, the right to **vote**.`,
      },
      {
        h: `Responsibilities`,
        fig: `duties`,
        say: `Required by law: obey laws, pay taxes, serve on a jury when called. Expected of good citizens: vote, stay informed, respect others’ rights, help the community.`,
      },
      {
        h: `The common good`,
        text: `Good citizens think about what helps the whole community, not only themselves.`,
      },
    ],
    watch: `In the US, voting is a right, but the law does not force anyone to vote. That is why it is called a **responsibility**: democracy only works when citizens choose to take part.`,
    tryIt: [
      {
        type: `sort`,
        q: `Is each one required by law, or a choice good citizens make?`,
        items: [`Pay taxes`, `Vote`, `Serve on a jury`, `Volunteer`, `Obey laws`, `Stay informed`],
        buckets: [`Required by law`, `Good citizen’s choice`],
        answers: [0, 1, 0, 1, 0, 1],
        hint: `Voting is a right, but the law does not force anyone to vote.`,
        why: `The law requires paying taxes, serving on a jury and obeying laws. Voting, volunteering and staying informed are choices good citizens make.`,
      },
      {
        q: `How old must US citizens be to vote in national elections?`,
        options: [`16`, `21`, `18`, `25`],
        answer: 2,
        hint: `It is the age when a person becomes an adult.`,
        why: `US citizens can vote in national elections starting at age 18.`,
      },
      {
        q: `Students start a petition to get a crosswalk near their school. They are:`,
        options: [`taking part in civic life`, `breaking the law`, `running for office`, `paying taxes`],
        answer: 0,
        hint: `They are working to improve their community.`,
        why: `A petition asks leaders to make a change. It is a way to take part in civic life, even before you can vote.`,
      },
    ],
  },
  {
    id: `ss-trade`,
    topic: `Trade, incentives and economic choices`,
    standard: `Economics`,
    goal: `I can explain scarcity, opportunity cost and incentives, and why people trade.`,
    hook: {
      text: `Mia has NT$300. She wants a concert light stick that costs NT$300 and a manga book that costs NT$200.`,
      ask: `Can she buy both? What happens when she picks one?`,
      reveal: `She cannot buy both, because her money is limited. That is **scarcity**. If she buys the light stick, the manga she gives up is her **opportunity cost**.`,
    },
    learn: [
      {
        h: `Scarcity`,
        text: `People’s wants are unlimited, but **resources** like money, time and materials are limited. So everyone has to make choices.`,
      },
      {
        h: `Opportunity cost`,
        text: `The **next best choice** you give up when you decide.`,
        ex: [`If you spend Saturday at the beach, your opportunity cost might be the movie you did not see.`],
        fig: `opp-cost`,
      },
      {
        h: `Incentives`,
        text: `An incentive is something that makes people want to act. **Positive** incentives are rewards, like a sale price or a prize. **Negative** incentives are penalties, like a fine for littering.`,
      },
      {
        h: `Trade`,
        text: `People and countries **specialize**: they focus on what they make best, then trade for the rest. Both sides gain.`,
        ex: [
          `The colonies traded tobacco and furs to Britain and bought cloth and tools.`,
          `Today, Taiwan sells computer chips around the world and buys foods like wheat and soybeans from the US.`,
        ],
        fig: `trade`,
      },
    ],
    watch: `Opportunity cost is **only the next best choice**, not everything you gave up. If you had five options, only your second favorite counts.`,
    tryIt: [
      {
        q: `A store has a “buy one, get one free” sale. This is:`,
        options: [`a negative incentive`, `scarcity`, `a positive incentive`, `opportunity cost`],
        answer: 2,
        hint: `Is it a reward or a penalty?`,
        why: `A free item is a reward that encourages people to buy, so it is a positive incentive.`,
      },
      {
        q: `Kai chose soccer practice over a birthday party. The party was his second choice. What is his opportunity cost?`,
        options: [`soccer practice`, `the birthday party`, `his homework`, `nothing`],
        answer: 1,
        hint: `What did he give up?`,
        why: `Opportunity cost is the next best choice given up, which was the birthday party.`,
      },
      {
        q: `Why do countries trade with each other?`,
        options: [`Each can specialize and get goods it does not make well.`, `Trade is required by law.`, `So they never need money.`, `Because there is no scarcity.`],
        answer: 0,
        hint: `Think about specializing.`,
        why: `Countries focus on what they make best and trade for the rest, so both sides end up with more.`,
      },
    ],
  },
  {
    id: `ss-saving`,
    topic: `Saving, investing and banks`,
    standard: `Personal financial literacy`,
    goal: `I can explain how saving, banks, interest and investing help money grow.`,
    hook: {
      text: `Mia gets NT$100 a week.\n*Plan A*: spend it all every week.\n*Plan B*: put NT$50 of it in the bank every week.`,
      ask: `After one year, which plan leaves her with more money? How much more?`,
      reveal: `Plan B. NT$50 × 52 weeks = **NT$2,600** saved, plus a little extra the bank pays her, called **interest**.`,
    },
    learn: [
      {
        h: `Saving`,
        text: `Saving means keeping money for later instead of spending it now. A **budget** is a plan for your money: some to spend, some to save, some to share.`,
        fig: `savings`,
      },
      {
        h: `Banks`,
        text: `Banks keep money safe. They lend savers’ money to borrowers, who pay the bank **interest**. The bank shares part of that interest with savers.`,
      },
      {
        h: `Interest`,
        ex: [
          `When you **save**, the bank pays **you** interest.`,
          `When you **borrow**, **you** pay the bank interest.`,
          `Example: NT$1,000 saved at 2% interest for one year earns NT$20.`,
        ],
      },
      {
        h: `Investing`,
        text: `Investing means buying something, like a small part of a company (a **stock**), hoping it grows in value. It can grow more than savings, but there is **risk**: you can also lose money.`,
        fig: `risk`,
      },
    ],
    watch: `**Higher reward usually means higher risk.** A savings account is very safe but grows slowly. Stocks can grow faster, but they can also go down.`,
    tryIt: [
      {
        q: `You borrow money from a bank. What do you usually have to pay back?`,
        options: [`only the money you borrowed`, `the money plus interest`, `nothing`, `half of the money`],
        answer: 1,
        hint: `Banks earn money by lending.`,
        why: `Borrowers pay back the money plus interest. Interest is how banks earn money from lending.`,
      },
      {
        q: `Which is usually the SAFEST place to keep savings?`,
        options: [`a lottery ticket`, `stock in one company`, `a savings account at a bank`, `a new video game`],
        answer: 2,
        hint: `Which one is very unlikely to lose money?`,
        why: `A savings account is very safe and grows slowly. Stock can lose value, and a lottery ticket usually wins nothing.`,
      },
      {
        q: `NT$500 earns 10% interest in one year. How much interest is that?`,
        options: [`NT$5`, `NT$50`, `NT$500`, `NT$10`],
        answer: 1,
        hint: `10% means one tenth.`,
        why: `One tenth of NT$500 is NT$50.`,
      },
    ],
  },
]
