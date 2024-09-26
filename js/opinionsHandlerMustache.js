import OpinionsHandler from "./opinionsHandler.js";
import Mustache from "./mustache.js";

/**
 * Class for  handling a list (an array) of visitor opinions in local storage
 * The list is filled from a form and rendered to html
 * A mustache template is used to render the opinions list
 */
export default class OpinionsHandlerMustache extends OpinionsHandler{

    /**
     * constructor
     * @param opinionsFormElmId - id of a form element where a new visitor opinion is entered
     * @param opinionsListElmId - id of a html element to which the list of visitor opinions is rendered
     * @param templateElmId - id of a html element with the mustache template
     */
    constructor(opinionsFormElmId, opinionsListElmId,templateElmId) {

        //call the constructor from the superclass:
        super(opinionsFormElmId, opinionsListElmId);

        //get the template:
        //document - stranka,
        this.mustacheTemplate=document.getElementById(templateElmId).innerHTML;
    }

    /**
     * creates html code for one opinion using a mustache template
     * @param opinion - object with the opinion
     * @returns {string} - html code with the opinion
     */
    opinion2html(opinion){
        //in the case of Mustache, we must prepare data beforehand:
        opinion.createdDate=(new Date(opinion.created)).toDateString();

        //use the Mustache:
        //doplnit sablonu datami
        const htmlWOp = Mustache.render(this.mustacheTemplate,opinion);

        //delete the createdDate item as we created it only for the template rendering:
        delete(opinion.createdDate);

        //return the rendered HTML:
        return htmlWOp;
    }
}