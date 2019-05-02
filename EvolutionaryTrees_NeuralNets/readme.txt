
Code written in Python 2.7

Packages used in the code:
	Keras
	Tensorflow
	Numpy
	Pandas
	Matplotlib
	Seaborn
	BioPython

Files:

jbg2160_FinalWriteup.doc - template-formatted writeup of the project

NeuralNetParsimonyTrees.ipyn - JupyterNotebook containing the code

sixSpeciesSimilarities.png, fiveSpeciesSimilarities - Illustration of how similar the species are to demonstrate what the neural net should produce

sixSpeciesLoss.png, fiveSpeciesLoss.png - Plot of the loss each epoch as the neural net trained to create a tree for the six species.

fiveSpecies_Matrix.png - just the parentage matrix for five species after training 300 epochs and taking the best result.

fiveSpecies.png, sixSpecies.png - the resulting parentage matrix and phylogeny resulting from training a neural net for 300 and 500 epochs, respectively. The Fitch Parsimony score is indicated above the phylogeny.

NNI_fiveSpecies.png, NNI_sixSpecies.png - shows the phylogeny produced by BioPython's Nearest Neighbor Interchange algorithm.

NM_008288.npy - the one-hot-encoded information for gene NM_OO8288 for 30 vertebrates, aligned by UC Santa Cruz's Golden Path Alignment.

sequences.npy - the saved genomic sequence for NM_008288, so the NNI algorithm can build its own tree.

