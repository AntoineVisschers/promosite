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

export type Token = TextToken | AlertToken | CardToken;
