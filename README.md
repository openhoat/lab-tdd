[![Build Status](https://travis-ci.org/openhoat/lab-tdd.png?branch=master)](https://travis-ci.org/openhoat/lab-tdd)
[![Coverage Status](https://coveralls.io/repos/github/openhoat/lab-tdd/badge.svg?branch=master)](https://coveralls.io/github/openhoat/lab-tdd?branch=master)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)]()

# TDD

Test Driven Development en pratique

## Objectifs :

- Faire le point sur la démarche TDD
- Mettre en pratique en construisant un petit jeu
- Identifier les difficultés et les intérêts de adoption
- Comprendre les enjeux

## Présentation :

[openhoat.github.io/lab-tdd](https://openhoat.github.io/lab-tdd/)

## TP :

Réalisation d'un jeu de dés en 9 étapes, pour chacune des étapes :
- Récupérer le test formulant les attendus dans [etc/solutions/test](tree/master/etc/solutions/test) 
- Le copier dans [test](tree/master/test) en supprimant de son nom "step[0-9]*-"
- Lancer les tests via le [browser](blob/master/test/index.html) ou par la commande "npm test", ou "mocha"
- Le tests est normalement non passant (rouge)
- **Faire le nécessaire dans les composants de [lib](tree/master/lib) pour faire passer le test à vert**
- Comparer avec la solution dans [etc/solutions/lib](tree/master/etc/solutions/lib), puis passer à l'étape suivante

Enjoy !
