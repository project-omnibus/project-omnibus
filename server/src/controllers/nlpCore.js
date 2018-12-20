import CoreNLP, { Properties, Pipeline, ConnectorCli } from 'corenlp';

const connector = new ConnectorCli({
  classPath: 'corenlp/stanford-corenlp-full-2018-10-05/*', // specify the paths relative to your npm project root
  mainClass: 'edu.stanford.nlp.pipeline.StanfordCoreNLP', // optional
  props: 'StanfordCoreNLP-spanish.properties', // optional
});
const props = new Properties({
  annotators: 'tokenize,ssplit,pos,lemma,ner,parse',
});
const pipeline = new Pipeline(props, 'English', connector);

exports.simpleTokenize = function(inputString){
  const sent = new CoreNLP.simple.Sentence(inputString);
  pipeline.annotate(sent)
    .then(sent =>{
      var tokens = sent.words();
      return tokens;
    })
    .catch(err =>{
      return err;
    });
}
