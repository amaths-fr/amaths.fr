// oxlint-disable-next-line typescript/no-extraneous-class
export class MetaEvents {
  static emitPageViewed() {
    window.fbq?.("track", "PageView");
  }
}
