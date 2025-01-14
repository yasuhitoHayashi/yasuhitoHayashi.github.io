# Announcing eventNoiseFilter – A Tool for Event-Based Camera Data Denoising
January-11-2025

---

**[View on GitHub](https://github.com/yasuhitoHayashi/eventNoiseFiltering)**  

## Introduction
When using event cameras in low-light conditions, noise processing becomes a significant challenge. In particular, when the bias setting is adjusted to negative values, the number of events increases dramatically, making it difficult to employ conventional processing methods. To address this issue, we developed eventNoiseFiltering, a tool for denoising and visualizing event-based camera data.

This tool implements filtering based on spatiotemporal neighborhood information, a technique often used in event camera noise reduction, using C++. It enables efficient and straightforward processing directly from Python.

## Key Features

Here’s what eventNoiseFiltering can do for you:
- Event Noise Filtering: Implements noise reduction techniques by evaluating the spatial and temporal proximity of events.
- Parameter Tuning: Allows fine-tuning of filtering parameters such as spatial and temporal thresholds to adapt to different datasets.
- Visualization Tools: Includes scripts for plotting raw, denoised, and aggregated event counts in customizable formats.

#### Input & Output: The left panel shows raw event data (downsampled to 1/10), and the right panel shows denoised results.
![Input](posts/pics/eventNoiseFilter/plotAll.png)
![Output](posts/pics/eventNoiseFilter/plotFiltered.png)

#### Event Count: Event counts aggregated in 50 ms bins over time.
![EventCount](posts/pics/eventNoiseFilter/plotEventCount.png)


## Sample Data
The sample data used in this repository was obtained during an experiment conducted in collaboration with Professor Nishino from Hirosaki University.
