export default class Article {
  constructor(obj) {
    obj = obj || {};
    this.title = obj.title;
    this.description = obj.description;
    this.body = obj.body;
    this.slug = obj.slug;
    this.image = obj.image;
    this.get_image = obj.get_image;
  }
}
