export const toolTipText = {
  demo: `Sorry but running the predictive model isn't available in this demo due to the amount of compute needed, since BERT can be a little heavy to run and I'm currently using free online hosting.
  
  To get a sense of the output you can take a look at the results from the sample author datasets, or take a look at the author classification Jupyter notebook file in server/notebooks to get a sense of how everything works. I also have a demo on the github page for this project that shows it in action.`,
  emotion: `Emotional analysis of the text created using a neural network fine-tuning of BERT, trained on the EmoBank dataset. Text is clasified using the VAD approach:
  
  Valence - Pleasantness, a high value indicates the text is positive.
  Dominance - Control, a high value indicates the text indicates little emotional restraint.
  Arousal - Engagement, a high value indicates the text is energetic.
  `,
  complexity: `Flesch-Kincaid reading ease is a metric that can be used to judge the level of reading ability need to parse a given piece of text, using a formula involving the total number of words, sentences, and syllables. A lower score indicates the text is harder to read.
  
  Lexical diversity is the ratio of unique words over the total number of words in the text, giving an indication of how complex and difficult to read a piece of text is. The idea being a more complicated work will utilise a wider vocabulary that may be harder for a reader to fully grasp.`
}