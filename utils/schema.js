export const slugify = input => {
    input = input
            .toLowerCase()
            .replace(/[*+~.,()'"!:@?|&\s]+/g, '-')
            .slice(0, 96)
          if (input.substr(-1) == "-") {
            input = input.slice(0, -1)
          }

          return (`${input}`).toLowerCase()
}