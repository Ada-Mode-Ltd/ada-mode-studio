import { VideoIdField } from "../../components/video";
import React from "react";

export default {
  type: "object",
  name: "videoId",
  title: "Video ID",
  inputComponent: VideoIdField,
  fields: [
    {
      type: "string",
      name: "url",
      title: "Video URL",
      description: "A URL to a Vimeo or Youtube video",
    },
    {
      type: "string",
      name: "id",
      title: "Video ID",
      description: "Auto generated",
      readOnly: true,
    },
    {
      type: "string",
      name: "service",
      title: "Service",
      description: "Auto generated",
      readOnly: true,
    },
    {
      type: "string",
      name: "thumbnail",
      title: "Thumbnail",
      description: "Auto generated",
      readOnly: true,
    },
  ],
  preview: {
    select: {
      id: "id",
      url: "url",
      service: "service",
      thumbnail: "thumbnail",
    },
    prepare({ service = "", thumbnail, url }) {
      return {
        title: `Video: ${url}`,
        media: () => (thumbnail ? <img src={thumbnail} /> : null),
      };
    },
  },
};