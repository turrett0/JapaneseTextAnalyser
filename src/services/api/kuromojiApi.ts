export const fetchKuromoji = (req: string) => {
  return fetch("http://localhost:5151/", {
    method: "POST",
    mode: "cors",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify({
      text: req,
    }),
  }).then((res) => res.json());
};
// export const fetchKuromoji = (req: string) => {
//   return fetch("https://dry-ravine-39390.herokuapp.com/", {
//     method: "POST",
//     mode: "cors",
//     headers: [["Content-Type", "application/json"]],
//     body: JSON.stringify({
//       text: req,
//     }),
//   }).then((res) => res.json());
// };
