import { defineArrayMember, defineType } from "sanity";
import { createElement } from "react";
import Box from "~/components/Box";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
      ],
      marks: {
        decorators: [
          {
            title: "Strong",
            value: "strong",
          },
          {
            title: "Box",
            value: "Box",
            icon: createElement("span", {}, "Box"),
            component: Box,
          },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
  ],
});
