export function typeColorGradient(types) {
  let color1;
  let color2;
  const normal = "#edeef0";
  const fire = "#ffca45";
  const water = "#33c5ff";
  const grass = "#23db4e";
  const electric = "#f7fa39";
  const ice = "#82f7ff";
  const fighting = "#c93510";
  const poison = "#c44dff";
  const ground = "#994d00";
  const flying = "#bfbfbf";
  const psychic = "#ff59d6";
  const bug = "#9dd100";
  const rock = "#785a10";
  const ghost = "#660085";
  const dark = "#0e0012";
  const dragon = "#554dff";
  const steel = "#aaaab3";
  const fairy = "#fabbf6";
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
