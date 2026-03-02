declare module "html-to-docx" {
  interface HtmlToDocxOptions {
    table?: {
      row?: {
        cantSplit?: boolean;
      };
    };
    footer?: boolean;
    header?: boolean;
  }

  function htmlToDocx(
    html: string,
    options?: HtmlToDocxOptions | null,
    config?: HtmlToDocxOptions
  ): Promise<Buffer>;

  export default htmlToDocx;
}
