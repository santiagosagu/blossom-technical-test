import { graphql, HttpResponse, delay } from "msw";

export const handlers = [
  graphql.query("GetAllCharacters", async () => {
    await delay(100);

    return HttpResponse.json({
      data: {
        characters: {
          results: [
            { id: "1", name: "Rick" },
            { id: "2", name: "Morty" },
          ],
        },
      },
    });
  }),
];
