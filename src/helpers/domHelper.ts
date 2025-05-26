class DomHelper {
  private parser: DOMParser = new DOMParser()
  parseFromString(html: string): Document {
    return this.parser.parseFromString(html, 'text/html')
  }
}

export default new DomHelper()
