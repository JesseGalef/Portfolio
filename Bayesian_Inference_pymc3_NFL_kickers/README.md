# Bayesian Inference to Compare two NFL Kickers using Pymc3

## January 2017 Portfolio Project, using BeautifulSoup to perform webscraping and pymc3 to implement probabalistic programming


You're the chief data scientist of a foobtall team, and you're facing a difficult decision. You're in the head office with the general manager and the team owner, and you're getting ready to sign a new kicker to the team. His name is Matt Stover, and his agent boasts that he made 178 out of 200 field goals - 89%. 

Suddenly, another agent waltzes in. "Wait!" he says. "I represent Billy Cundiff, the hot young kicker who's made 95% of his attempts. We're asking for the same amount Stover is, despite having a higher average. It's a steal!"

"Oh come on," says the first agent, rolling his eyes. "He made 95% because he's only taken 20 kicks and happened to make 19 of them. He got lucky and is trying to cash in. I bet Stover is at least 2% better."

"Are you looking for the next great kicker, or just an ok one?" asks Cundiff's agent. "You know what you're getting with Stover, but Cundiff has a chance to be great."

The general manager looks to you. "What do you think? Is making 19 out of 20 kicks enough evidence to conclude that young Cundiff is better than the established Stover? Or do we think he got lucky?"

What's your intuition? 

A) General Manager's Question: How likely is Cundiff to be more accurate than Stover?
B) Stover's Agent's Claim: How likely is Stover to be at least 2% more accurate than Cundiff?
C) Cundiff's Agent's Claim: If having an accuracy of over 92% counts as great, how much more likely is Cundiff to be a 'great' kicker compared to Stover?



Typical null hypothesis significance testing would ask: "If the two kickers were equally skilled, what are the chances that we would see their averages differ this much or more?" Applying a chi-squared contingency test, we would find that p > .6, indicating that there's a decent chance the kickers are equally good, and we can't reject the possibility.

Fortunately, you were trained to use Bayesian techniques. Instead of addressing "Given a null hypothesis, how likely are these results?" it tries to answer "Given these results, how likely are different hypotheses?" This is what we actually want to know.

The knock against Bayesian methods is typically that they are computationally expensive and are somewhat subjective because they require you to have prior beliefs to use as a jumping-off point. For example, if you think that rookie kickers almost never have over 90% accuracy, it would seem far more likely that Cundiff got lucky rather than actually being that good. On the other hand, if you think it's well within the range of possibility that a rookie has 95% accuracy, there's less reason to resort to luck as an explanation for his success.

Bayesianism can certainly be subjective, but it works best when you can use informed priors. In this case, I scraped the real season percentages for rookie kickers who attempted at least 20 kicks in their first year. (It's better to use just the rookie data, because kickers who stay in the league for years are more likely to be good kickers.)

We can use these data to generate possible priors for how accurate rookie kickers are. Then, we can model the distribution of how likely different accuracies are to produce the results we saw - Stover making 178 of 200 and Cundiff making 19 of 20.

The pymc3 library makes this easy - incorporating distributions of the prior's parameters that produce the rookie data, and distributions of possible Stover & Cundiff accuracies that produce the results. It converges on the best distributions one step at a time, taking values and updating the distributions tens of thousands of times based on how well they explained our observations.  

By the end, we have probability distributions we can compare.  Stover's a known quantity, with a narrow range of accuracies - our 95% credible interval indicates that we think his accuracy is likely to be between 81.3% and 91.8%.  Cundiff is a bit more of a mystery - his 20 kicks make us think his accuracy is 95% likely to be between 74.1% and 94.4%.

![alt text](/assets/AccuracyProbabilityDistributions.png "Kicker Accuracy Probability Distributions")

Because these are bayesian probability distributions of how likely we think different accuracies are, we can answer our 3 questions directly.  

A) 61.7% of the probability distribution has Stover's accuracy higher than Cundiff's.  
![alt text](/assets/deltaDistribution_0.png "Kicker Accuracy Probability Distributions")

B) Stover's accuracy was .02 higher than Cundiff's in 47.5% of the probability distribution - his agent was incorrect.

![alt text](/assets/deltaDistribution_0.png "Kicker Accuracy Probability Distributions")

C) 1.8% of Stover's Accuracy Probability Distribution was over .92, compared to 10.5% of Cundiff's, making Cundiff almost 6 times more likely to be a 'great' kicker. Stover is a known quantity, and while it's very likely he's good, he's unlikely to be great. 

![alt text](/assets/AccuracyProbabilityDistributions_92.png "Kicker Accuracy Probability Distributions")

