import { defineStore } from "pinia";

export const useQueueStore = defineStore("queueStore", {
  state: () => ({
    playingEpisode: null,
    queue: [],
  }),

  getters: {
    // getPlayingEpisode: (state) => state.playingEpisode,
    // getQueue: (state) => state.queue,
  },

  actions: {
    playPodcast(podcast) {
      const arrayQueue = [...podcast.items];

      this.playingEpisode = arrayQueue.shift();

      sessionStorage.setItem(
        "playingEpisode",
        JSON.stringify(this.playingEpisode)
      );

      this.queue = arrayQueue;
      sessionStorage.setItem("queue", JSON.stringify(arrayQueue));
    },

    playEpisode(episode) {
      this.playingEpisode = episode;

      const index = this.queue.findIndex((e) => {
        return e.id === episode.id;
      });
      if (index === -1) {
        this.queue = [];
        sessionStorage.setItem("queue", JSON.stringify([]));
      } else {
        this.queue.splice(0, index + 1);
        sessionStorage.setItem("queue", JSON.stringify(this.queue));
      }
      sessionStorage.setItem(
        "playingEpisode",
        JSON.stringify(this.playingEpisode)
      );
    },

    setQueue(newQueue) {
      this.queue = newQueue;
    },

    moveToNextEpisode() {
      if (this.queue.length > 0) {
        const nextEpisode = this.queue.shift();
        this.playingEpisode = nextEpisode;
      }
    },

    addToQueue(content) {
      if (content.length > 1) {
        content.map((episode) => {
          this.queue.push(episode);
        });
      } else {
        this.queue.push(content);
      }
      sessionStorage.setItem("queue", JSON.stringify(this.queue));
    },
    removeFromQueue(episodeId) {
      this.queue = this.queue.filter((e) => {
        return e.id != episodeId;
      });
      sessionStorage.setItem("queue", JSON.stringify(this.queue));
    },
    // removeFromQueue(episodeId) {
    //   this.queue = this.queue.filter((e) => e._id !== episodeId);
    //   sessionStorage.setItem("queue", JSON.stringify(this.queue));
    // },
    getQueue() {
      if (sessionStorage.getItem("queue")) {
        this.queue = JSON.parse(sessionStorage.getItem("queue"));
      }
      if (sessionStorage.getItem("playingEpisode")) {
        this.playingEpisode = JSON.parse(
          sessionStorage.getItem("playingEpisode")
        );
      }
    },
    clearQueue() {
      this.queue = [];
      sessionStorage.removeItem("queue");
    },
  },
});
