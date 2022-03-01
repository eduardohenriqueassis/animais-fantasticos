import { init } from "es-module-lexer";

export default class ScrollAnima {
  constructor(sections){
    this.sections = document.querySelectorAll(sections);
    this.windowMetade =  window.innerHeight * 0.6;

    this.checkDistance = this.checkDistance.bind(this)
  }

  // verifica a distância de cada objeto em relação ao scroll do site
  getDistance(){
    this.distance = [...this.sections].map((section) =>{
      const offset = section.offsetTop;
      return {
        element: section,
        offset: offset - Math.floor(this.windowMetade),
      };
    });
  }

  // pega a distância de cada item em relação ao topo do site.
  checkDistance(){
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add('ativo');
      } else if (item.element.classList.contains('ativo')) {
        item.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if(this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance)
    }
    return this;
  }

  // remove a função scroll, caso seja necessário.
  stop() {
    window.removeEventListener('scroll', this.checkDistance)
  }
  
}
