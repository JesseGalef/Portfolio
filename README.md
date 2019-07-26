# Jesse Galef Data Science & Machine Learning Portfolio Projects

**[Resume (pdf)](https://github.com/JesseGalef/Portfolio/raw/master/Jesse_Galef_Resume.pdf)** **[LinkedIn](https://www.linkedin.com/in/jessegalef)**

--- 

## [1) Quantifying the 'Trumpiness' of Political Speech Using Natural Language Processing](https://github.com/JesseGalef/Portfolio/tree/master/Trumpiest_Sentences)

Summary: Donald Trump and Hillary Clinton have fairly distinct speaking styles on the campaign trail, but what makes them distinct? 

This project scrapes transcripts from CSPAN.org to train a model to identify the most important terms for identifying which candidate said a given sentence, and to find the most emblematic sentence for each (The 'Trumpiest', if you will).

In addition to graphs visualizing the results, I created [an interactive D3 JavaScript page](https://rawgit.com/jessegalef/portfolio/master/Trumpiest_Sentences/interactive.html) for visitors to play with the results, enter their own sentences for evaluation, and look up terms.

One result:

<img src='Trumpiest_Sentences/assets/widerPronouns.png' width='500' />

## 2) [Improving Image Classification with Data Augmentation](https://github.com/JesseGalef/Portfolio/tree/master/Image_Augmentation/ImageAugmentation_Cifar10.ipynb) -- Pretending you have more data than you do

Summary: In training a neural net, having more training images can make a real difference -- but that can be expensive. Rather than paying a grad student to go take and label more pictures, you can be creative and reuse the images you have.

To demonstrate, I built a convolutional neural net with Keras to classify images from the standard CIFAR-10 dataset. In addition to using different number of samples, I wrote a data generator to automatically apply one of seven random image transformations to each sample during training. 

Even without any fine-tuning, it made a big difference -- models that augmented their data during training not only scored significantly better than models which didn't; they scored even better than models trained with twice as much data.

<img src='Image_Augmentation/result_graph.png' />

Without data augmentation (orange), the models' performance tended to level off much more quickly, having learned what they could after about 20 training epochs. 

The models using data augmentation (blue) were able to keep learning for longer, and probably would have continued to improve beyond the 100 epochs I trained them for.

(As is often the case, Keras now has built-in functionality to do this, but I wanted to demonstrate more of the concept for myself)


## 3) [Evaluating NFL Play Calling Predictability](https://github.com/JesseGalef/Portfolio/tree/master/NFL_Playcalling) - Controlling for multiple non-linear confounding variables using inverse probability of treatment weighting

Summary: There's a curious pattern in NFL play calling, which we think might be the result of coaches' irrationality. But there are so many confounding variables in play - score, time, QB quality, etc. - that we need to control for those first before passing judgement.

The project is an exercise in feature engineering and the 'inverse probability of treatment weighting' technique of controlling for confounds. These features were disproportionately distributed between the groups I was comparing, but became far more similar after being reweighted.

<img src='NFL_Playcalling/data/Lead_distribution_split.png' width='500' />

<img src='NFL_Playcalling/data/all_yards_playcalling.png' width='500' />

## 4) [Making Judgements on Limited Information](https://github.com/JesseGalef/Portfolio/tree/master/Bayesian_Inference_pymc3_NFL_kickers) - Using Bayesian Inference to Compare Hypothetical Options

Summary: This project was an example probabilistic programming problem I created for the data science class I was TA'ing. If you have two options, one established and one much newer, how do you judge the probability each is better given the limited information you have?

For the class, the example uses hypothetical field goal kickers, but it generalizes to other topics like A/B testing.

The project scrapes data from NFL.com to use as a prior distribution, then it shows the students how to use the pymc3 library to generate new probability distributions and answer specific questions.

<img src='Bayesian_Inference_pymc3_NFL_kickers/assets/AccuracyProbabilityDistributions_92.png' width='500' />

## 5) [Estimating Pi from Random Numbers](https://github.com/JesseGalef/Portfolio/tree/master/EstimatingPi_VarianceReduction) - Reducing Variance using Antithetic and Control Variates

Summary: This was a fun little project I put together to demonstrate techniques I was learning in my Simulations course (IEOR 4404) in graduate school. 

Using only 10,000 random numbers, how accurately can we estimate pi? The classic technique of plotting points and counting how many fall within a quarter-circle does pretty well, but there's a decent margin of error. 

<img src='EstimatingPi_VarianceReduction/points.png' width='500' />

With unlimited random points, our estimate would get closer and closer to the true value of pi. But even sticking with only our 10,000 random numbers, we can apply some tricks and narrow our confidence interval significantly.

<img src='EstimatingPi_VarianceReduction/antithetic.png' width='500' />
