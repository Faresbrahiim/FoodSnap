// Fake data for now. Later your friend's login/signup replaces this with the real user.
// Agree on these field names together so the swap is easy.
export type User = {
  name: string;
  username: string;
  avatar: string | null; // image url, or null to show initials
  recipesCount: number;
  favoritesCount: number;
  followersCount: number;
};

export const mockUser: User = {
  name: "Fares ibrahim",
  username: "@fares_foodsnap",
  avatar: null,
  recipesCount: 12,
  favoritesCount: 8,
  followersCount: 5,
};