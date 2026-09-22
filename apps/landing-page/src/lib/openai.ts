// oxlint-disable-next-line typescript/no-extraneous-class
class StoredData {
  static pageViewedLastEmittedAt() {
    const data = localStorage.getItem("pageViewedLastEmittedAt");

    if (!data) {
      return undefined;
    }

    const date = new Date(data);

    return !Number.isNaN(date.getTime()) ? date : undefined;
  }

  static setPageViewedLastEmittedAt(date: Date) {
    localStorage.setItem("pageViewedLastEmittedAt", date.toISOString());
  }
}

// oxlint-disable-next-line typescript/no-extraneous-class
export class OpenAiEvents {
  static emitPageViewedIfNeeded() {
    const now = new Date();

    if (
      (StoredData.pageViewedLastEmittedAt()?.getTime() ?? 0) >
      now.getTime() - 3600 * 1000
    ) {
      return;
    }
    window.oaiq?.("measure", "page_viewed", { type: "contents" });
    StoredData.setPageViewedLastEmittedAt(now);
  }

  static emitFormSubmitted() {
    window.oaiq?.(
      "measure",
      "custom",
      { type: "custom" },
      { custom_event_name: "reserver" },
    );
  }
}
