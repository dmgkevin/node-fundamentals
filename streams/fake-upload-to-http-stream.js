import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    //metodo read
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}
//Fetch API => Serve para gente fazer requisições de uma aplicação para outra
fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
})
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
  });
 