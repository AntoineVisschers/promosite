export type TextToken = {
  type: "text";
  value: string;
};

export type AlertToken = {
  type: "alert";
  props: {
    variant: "info" | "warning" | "error";
  };
  children: Token[];
};

export type CardToken = {
  type: "card";
  props: {
    id: string;
  };
};

export type TitleToken = {
  type: "title";
  props: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
  children: Token[];
};

export type EmphaseToken = {
  type: "emphase";
  children: Token[];
};

export type Token =
  | TextToken
  | AlertToken
  | CardToken
  | TitleToken
  | EmphaseToken;
