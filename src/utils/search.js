export function searchTopics(topics, query) {
  if (!query || query.trim() === "") return [];

  const cleanQuery = query.toLowerCase().trim();
  const results = [];

  for (const topic of topics) {
    let score = 0;

    // Check title match (high priority)
    if (topic.title.toLowerCase() === cleanQuery) {
      score += 100;
    } else if (topic.title.toLowerCase().includes(cleanQuery)) {
      score += 50;
    }

    // Check introduction match (medium priority)
    if (topic.introduction.toLowerCase().includes(cleanQuery)) {
      score += 20;
    }

    // Check category match
    if (topic.category.toLowerCase().includes(cleanQuery)) {
      score += 10;
    }

    // Check sections match (low priority)
    let sectionMatches = 0;
    for (const section of topic.sections) {
      if (section.title.toLowerCase().includes(cleanQuery)) {
        score += 15;
        sectionMatches++;
      }
      if (section.content.toLowerCase().includes(cleanQuery)) {
        score += 5;
        sectionMatches++;
      }
    }

    if (score > 0) {
      results.push({
        topic,
        score,
        matches: sectionMatches
      });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score).map(r => r.topic);
}
