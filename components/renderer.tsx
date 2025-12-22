import { Token } from "../content/types/Token";
import { mapTags } from "../content/map_tags";

export function renderTokens(tokens: Token[]) {
  return tokens.map((token, i) => {
    switch (token.type) {
      case "text":
        return (
          <p key={i} className="whitespace-pre-wrap">
            {token.value}
          </p>
        );

      case "alert": {
        const AlertComponent = mapTags["alert"];

        return (
          <AlertComponent key={i} variant={token.props.variant}>
            {renderTokens(token.children)}
          </AlertComponent>
        );
      }
      case "card":
        return mapTags["card"]({ id: token.props.id });

      default:
        return null;
    }
  });
}
