import { Token } from "../content/types/Token";
import { mapTags } from "../content/map_tags";
import React from "react";

export function renderTokens(tokens: Token[]) {
  return tokens.map((token, i) => {
    switch (token.type) {
      case "text": {
        console.log("text :", token);
        // Diviser le texte en parties séparées par des sauts de ligne
        const lines = token.value.split("\n");
        console.log(lines);
        return (
          <span key={i}>
            {lines.map((line, j) => (
              <React.Fragment key={j}>
                {line}
                {j < lines.length - 1 && !(j == 0 && lines[j] == "") && <br />}
              </React.Fragment>
            ))}
          </span>
        );
      }
      case "alert": {
        const AlertComponent = mapTags["alert"];
        // console.log("alert :", token);
        return (
          <AlertComponent key={i} variant={token.props.variant}>
            {renderTokens(token.children)}
          </AlertComponent>
        );
      }
      case "card":
        return mapTags["card"]({ id: token.props.id });

      case "title": {
        // console.log("title :", token);
        const TitleComponent = mapTags["title"];
        return (
          <TitleComponent key={i} level={token.props.level}>
            {renderTokens(token.children)}
          </TitleComponent>
        );
      }

      case "emphase": {
        console.log("emphase :", token);
        const EmphaseComponent = mapTags["emphase"];
        return (
          <EmphaseComponent key={i}>
            {renderTokens(token.children)}
          </EmphaseComponent>
        );
      }

      default:
        return null;
    }
  });
}
