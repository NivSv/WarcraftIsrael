export const GUILDS = [
  {
    name: 'genesis',
    realm: 'kazzak',
  },
];

export const MAX_LEVEL = 70;

export type Guild_Member = {
  character: {
    name: string;
    level: number;
    realm: {
      slug: string;
    };
  };
  rank: number;
};
