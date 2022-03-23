export function typeColorGradient(types) {
  let color1;
  let color2;
  const normal = "#bfbfbf";
  const fire = "#ffbc40";
  const water = "#33c5ff";
  const grass = "#59ed4e";
  const electric = "#f7fa39";
  const ice = "#82f7ff";
  const fighting = "#e05f02";
  const poison = "#b787ff";
  const ground = "#d98e4c";
  const flying = "#a7c4c9";
  const psychic = "#ff8aed";
  const bug = "#9dd100";
  const rock = "#d6b292";
  const ghost = "#8769ff";
  const dark = "#474747";
  const dragon = "#6685ff";
  const steel = "#8e99a3";
  const fairy = "#ffd4f8";
  //make all colors variables
  switch (types[0]) {
    case "normal":
      color1 = normal;
      break;
    case "fire":
      color1 = fire;
      break;

    case "water":
      color1 = water;
      break;
    case "grass":
      color1 = grass;
      break;
    case "electric":
      color1 = electric;
      break;
    case "ice":
      color1 = ice;
      break;
    case "fighting":
      color1 = fighting;
      break;
    case "poison":
      color1 = poison;
      break;
    case "ground":
      color1 = ground;
      break;
    case "flying":
      color1 = flying;
      break;
    case "psychic":
      color1 = psychic;
      break;

    case "bug":
      color1 = bug;
      break;
    case "rock":
      color1 = rock;
      break;
    case "ghost":
      color1 = ghost;
      break;
    case "dark":
      color1 = dark;
      break;
    case "dragon":
      color1 = dragon;
      break;

    case "steel":
      color1 = steel;
      break;

    case "fairy":
      color1 = fairy;
      break;
    default:
      color1 = "white";
  }
  if (types.length === 2) {
    switch (types[1]) {
      case "normal":
        color2 = normal;
        break;
      case "fire":
        color2 = fire;
        break;

      case "water":
        color2 = water;
        break;
      case "grass":
        color2 = grass;
        break;
      case "electric":
        color2 = electric;
        break;
      case "ice":
        color2 = ice;
        break;
      case "fighting":
        color2 = fighting;
        break;
      case "poison":
        color2 = poison;
        break;
      case "ground":
        color2 = ground;
        break;
      case "flying":
        color2 = flying;
        break;
      case "psychic":
        color2 = psychic;
        break;

      case "bug":
        color2 = bug;
        break;
      case "rock":
        color2 = rock;
        break;
      case "ghost":
        color2 = ghost;
        break;
      case "dark":
        color2 = dark;
        break;
      case "dragon":
        color2 = dragon;
        break;

      case "steel":
        color2 = steel;
        break;

      case "fairy":
        color2 = fairy;
        break;
      default:
        color2 = "white";
    }
  } else {
    color2 = color1;
  }
  return [color1, color2];
}
