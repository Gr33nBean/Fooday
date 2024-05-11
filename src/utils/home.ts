export const BLOG_BODY_LENGTH_LIMIT = 100;

export const isTooLong =
  (limit = BLOG_BODY_LENGTH_LIMIT) =>
  (text: string = "") =>
    text.length > limit;

export const trimmedBody = (text: string = "") =>
  text.slice(0, BLOG_BODY_LENGTH_LIMIT) + "...";

export const extractMentions = <T>(mentions: T[]) => {
  return mentions.reduce<{
    firstMentions: T[];
    restMentionsCount: number;
  }>(
    (accumulator, mention, index) => {
      if (index < 3) {
        accumulator.firstMentions.push(mention);
      } else {
        accumulator.restMentionsCount += 1;
      }
      return accumulator;
    },
    {
      firstMentions: [],
      restMentionsCount: 0,
    }
  );
};
