/**
 * Class for  handling a list (an array) of visitor opinions in local storage
 * The list is filled from a form and rendered to html
 * A template literal is used to render the opinions list
 */
export default class OpinionsHandler {

    /**
     * constructor
     * toto je id elementu kde sa zadava novy komentar v html
     * @param opinionsFormElmId - id of a form element where a new visitor opinion is entered
     * toto je id elementu, ze ktory komentar je pozadovany
     * @param opinionsListElmId - id of a html element to which the list of visitor opinions is rendered
     */
    constructor(opinionsFormElmId, opinionsListElmId){ //("opnFrm","opinionsContainer")
        this.opinions = [];  //obsahuje data formularov
        this.opinionsElm = document.getElementById(opinionsListElmId); //odkaz na prvok na stranke kde budeme ukladať comentare
        this.opinionsFrmElm = document.getElementById("opnFrm"); //odkaz na formular
    }

    /**
     * initialisation of the list of visitor opinions and form submit setup
     */
    init(){
        if (localStorage.myTreesComments) {
            //vlozenie existujucich komentárov do opinions
            //JSON parse - vloženie dát do iných premenných, praca javascriptu s textom
            this.opinions = JSON.parse(localStorage.myTreesComments);
        }
        //obsah pola opinions sa dostane do elementu opinionsElm
        //vykona sa to pri nacitani stranky v prehliadaci
        this.opinionsElm.innerHTML = this.opinionArray2html(this.opinions); //pridaj komentare na stranku v určenej forme
        this.opinionsFrmElm.addEventListener("submit", event => this.processOpnFrmData(event));
    }

    /**
     * Processing of the form data with a new visitor opinion
     * @param event - event object, used to prevent normal event (form sending) processing
     */

     processOpnFrmData(event){
        //1.prevent normal event (form sending) processing
        event.preventDefault();
  
        //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
        const name = document.getElementById("nameElm").value.trim();
        const email = document.getElementById("emailElm").value.trim();
        const picture = document.getElementById("picture").value;
        
        const radioBox = document.getElementById("opnFrm").elements["radiobox"].value;
        
        const checkBox1 = document.getElementById("checkBox1").checked;
        const checkBox2 = document.getElementById("checkBox2").checked;
        const checkBox3 = document.getElementById("checkBox3").checked;
        let textCheckBoxs = "";

        if(checkBox1 == true)textCheckBoxs += "Perzská mačka ";
        if(checkBox2 == true)textCheckBoxs += "Ragdoll ";
        if(checkBox3 == true)textCheckBoxs += "Munchkin ";

        const opinion = document.getElementById("opnElm").value.trim();
        const keyword = document.getElementById("keywords").value;
  
        //3. Verify the data
        if(name=="" || email=="" || opinion == ""){
            return;
        }
  
        //3. Add the data to the array opinions and local storage

        const userRating =
            {
                name: name,
                email: email,
                picture: picture,
                rating: radioBox,
                topics: textCheckBoxs,
                comment: opinion,
                keyWord: keyword,
                created: new Date()
            };
  
            //zapis do konzoly
        console.log("New opinion:\n "+JSON.stringify(userRating));
  
            //do opinios pridam user rating
        this.opinions.push(userRating);
  
        localStorage.myTreesComments = JSON.stringify(this.opinions);

        //4. Update HTML
        this.opinionsElm.innerHTML+=this.opinion2html(userRating);
  
        //5. Reset the form
        this.opinionsFrmElm.reset(); //resets the form
    }

    /**
     * creates html code for one opinion using a template literal
     * @param opinion - object with the opinion
     * @returns {string} - html code with the opinion
     */
    opinion2html(opinion){

        const opinionTemplate=
            `
                <section>    
                </section>`;

        return opinionTemplate;
    }

    /**
     * creates html code for all opinions in an array using the opinion2html method
     * @param sourceData -  an array of visitor opinions
     * @returns {string} - html code with all the opinions
     */
    opinionArray2html(sourceData){

        //dlhy string, vsetky komentare dokopy
        let htmlWithOpinions="";

        //v opn sa nachadza 1 komentar
        for(const opn of sourceData){
            //tvar komentára
            htmlWithOpinions += this.opinion2html(opn);
        }
        return htmlWithOpinions;
    }
}



