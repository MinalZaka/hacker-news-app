import React from "react";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { isLoading, stories, removeStory } = useGlobalContext();

  if (isLoading) {
    return <h2 className="loading"></h2>;
  }

  return (
    <section className="stories">
      {stories.map((story) => {
        const { objectID, title, num_comments, url, points, author } = story;

        return (
          <article key={objectID} className="story">
            <h4 className="title">{title || "no title"}</h4>
            <p className="info">
              {points} points by <span>{author} | </span> {num_comments}{" "}
              comments
            </p>
            <div>
              <a
                href={url}
                className="read-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                read more
              </a>
              <button
                className="remove-btn"
                onClick={() => removeStory(objectID)}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
