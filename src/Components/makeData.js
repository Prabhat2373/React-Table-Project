// import namor from "namor";

// const range = len => {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// };

// const newPerson = () => {
//   const firstName = namor.generate({ words: 1, numbers: 0 });
//   const lastName = namor.generate({ words: 1, numbers: 0 });
//   const manager = Math.random() > 0.5;

//   const choice = list => {
//     const index = Math.floor(Math.random() * list.length);
//     return list[index];
//   };

//   return {
//     email: `${firstName}.${lastName}@email.com`,
//     alias: firstName,
//     gender: Math.random() > 0.5 ? "M" : "F",
//     manager: manager ? "Y" : "N",
//     teamsManaged: manager ? Math.floor(Math.random() * 10) : 0,
//     startHour: 9,
//     endHour: 18,
//     primaryTeam: choice([
//       "Analytics",
//       "Data",
//       "Janitorial",
//       "Combinatorics",
//       "HR",
//       "Sales"
//     ])
//   };
// };

// export default function makeData(...lens) {
//   const makeDataLevel = (depth = 0) => {
//     const len = lens[depth];
//     return range(len).map(d => {
//       return {
//         ...newPerson(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
//       };
//     });
//   };

//   return makeDataLevel();
// }
