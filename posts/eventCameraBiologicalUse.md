# Event-based biological research: Review
January-22-2025

---
This article is an English translation of a review written in Japanese for a Journal of the Society of Instrument and Control Engineers, with assistance from ChatGPT. For further reference, please see a google sheets compiling a list of studies utilizing event cameras in biological fields.

https://docs.google.com/spreadsheets/d/1lRiUqsarrZ-K3AOEgryv6VIb1pxsCQUaaBPE_TAsA-U/edit?usp=sharing


## Introduction
Advancements in instrumentation have often driven new discoveries. Measurement tools have expanded the spatio-temporal domains available for observation, such as telescopes enabling the detection of distant stars invisible to the human eye and microphones capturing ultrasonic waves beyond the range of human hearing.
Recent developments in machine learning, particularly deep learning, have further extended the measurable spatio-temporal space and enabled machines to perform tasks such as classification and segmentation without the need for human interpretation or visualization of data. This progress has increased interest in sensors that were previously difficult to utilize with conventional technologies.
Event cameras, a type of neuromorphic device inspired by neural information transmission, have attracted significant attention. These cameras use a data format and representation that differ fundamentally from traditional frame-based cameras, offering advantages such as high temporal resolution and exceptional low-light performance, which are unattainable with conventional technologies. However, their use also involves certain limitations that researchers must consider.
We have applied event cameras to capture images of marine organisms, particles, and various other subjects, including nocturnal bats. This paper examines the potential of event cameras to transform biological observation and contribute to advancements in this field.

![papers](posts/pics/review/papers.jpeg "papers")
Figure 2: Trends in Event Camera Research Publications, Including Applications in Biological Fields (Orange).

## History of the biological measurement by the imaging system  
The history of attempts to record visual information is a long one. Early examples include humans depicting wild animals in cave paintings (13) and Haeckel, equipped with a microscope, producing beautiful illustrations of microscopic marine organisms (29). In the 19th century, the advent of photography greatly enhanced techniques for recording spatial information, and this development was constantly accompanied by eye-catching photographs of living creatures. In 1839, the shadow of a plant was directly recorded on photosensitive paper (67), a technique dubbed “photogenic drawing.” Subsequently, this recording technology stabilized into a method that captured the light passing through a camera obscura’s lens, leading to the publication of many photographs of nature and organisms from the 19th to the 20th century. The invention of the flash in the 1890s considerably broadened the possibilities of photography. Nighttime images of white-tailed deer were captured by an automated system in which the animal itself triggered the shutter (39), and in the 1920s, the light of magnesium flares enabled the first color recording of fish swimming naturally underwater (41).

Around the same period, technology for capturing high-speed phenomena also evolved. As early as 1870, sequences of galloping horses were already being photographed by using multiple cameras(62), and fast mechanical shutters made it possible to record continuous motion onto a single strip of film (12). Stroboscopic technology, developed by Edgerton, enabled extremely short exposures that could not be achieved with mechanical shutters alone, thereby capturing even faster movements such as flying insects and bullets (22). This technology significantly contributed to research on the flight of insects (15,52). Once film became widely available, photography was popularized; it was later swept into the wave of digitalization, and by the 2000s, anyone could record high-quality photographs and videos on a personal device. Biologists now capture the instantaneous behaviors of organisms under the microscope, while ecologists carry out long-term automatic observations at remote locations through the power of sunlight and the internet (64,75). As photographic technology has advanced, biological measurement using images has expanded from descriptive, phenomenon-based approaches to more analytical ones (79). Moreover, it is increasingly treated as just one among many large datasets—without relying on human interpretation—especially in fields where deep learning is employed.

In this era, we must once again reconsider the “limitations of biological research using imaging technology.” Living organisms keep their activities day and night. Deep-sea creatures thrive in environments with little to no light. Furthermore, many species, from birds to plants, possess organs optimized for high-speed functionality. In measurements using imaging, capturing objects in darkness or those moving at high speeds is particularly challenging.

Measurements in low-light conditions are typically achieved using strobe lights, infrared imaging, or specially designed high-sensitivity cameras, while high-speed objects are captured using high-speed cameras. However, when it comes to “measuring high-speed motion occurring in low-light conditions,” the difficulty rises significantly. Moreover, maintaining a stable power supply in extreme environments such as oceans, mountains, or forests further complicates measurements using existing technologies.

## What is Event Camera?

Event cameras are a type of neuromorphic device that record the spatio-temporal information of light. They are different from conventional cameras in that they record only the changes in light intensity, not the entire image. Each pixel in the sensor independently determines whether to output data, and the output is transferred as a continuous, unsynchronized stream. If the brightnesschange is positive, it is assigned a positive polarity; if negative, it is assigned a negative polarity. This means that the data recorded by event cameras is not a single image, but a series of events that occur at specific times and locations.
The brightness change, referred to as an “event,” is represented as a time-series dataset consisting of four values: coordinates x, y, polarity, and timestamp. This structure is sparse and unsynchronized, unlike conventional frame-based data. Because synchronization across all pixels is not required, individual pixels can output data continuously at an equivalent rate of 10,000 fps. Furthermore, since data from static objects without brightness changes is not recorded, the camera is highly efficient in terms of power consumption and memory usage.

A notable characteristic of event cameras is their high dynamic range. Incident light is first converted into current by photodiodes and then into voltage. During this process, logarithmic compression is applied, enabling the output of events even with small brightness changes under low-light conditions. This capability allows the camera to capture events effectively regardless of temporal and spatial changes in both high-illumination and low-illumination environments.

![eventCameraPros](posts/pics/review/eventCamera.jpeg "eventCameraPros")
Figure 3: The good point of using Event camera

Nevertheless, event cameras uniquely combine low-light performance and high-speed capabilities while minimizing resource usage such as power and storage. As a result, research utilizing event cameras is rapidly increasing (16,24,34). In the field of biology, their application is still in its early stages, much like other technologies that have emerged in the past (Figure 2).

## Current Utilization of Event Cameras and Applications in industrial fields

For any sensor, it is necessary to represent the acquired data in a format that can be interpreted and analyzed. In the case of event data, attempts have been made to frame events by projecting them onto a plane within a certain time range, allowing the use of well-developed image processing techniques designed for frame-based cameras (37). While this approach has the advantage of leveraging existing analysis methods (24,32), it fails to fully utilize the high temporal resolution and event frequency, which are characteristic of event cameras.

To address these challenges, new representation methods that preserve the sparsity and asynchrony of event data while enabling high-speed processing are being researched. For instance, techniques have been proposed to model events as spatiotemporal graphs and process them using Graph Neural Networks (GNNs) (3,10,21,26,40,53). Additionally, efforts to incorporate Spiking Neural Networks (SNNs) have been explored (4,5,7,14,18,36,48-50,61,63,74,77).

These new processing methods particularly shine in applications where the high temporal resolution and low power consumption of event cameras can be fully utilized. For example, integrating event cameras as the “eyes” of autonomous driving systems and advanced driver-assistance systems (ADAS) is expected to address issues faced by conventional frame-based cameras (57). Traditional frame-based cameras can capture high-resolution and color information, but they struggle with rapid brightness changes, detecting fast-approaching objects, and ensuring visibility in nighttime or adverse weather conditions. In contrast, event cameras demonstrate superior performance in these scenarios (27).

Moreover, combining event cameras with Spiking Neural Networks (SNNs), another event-driven neuromorphic computing approach, allows for significantly lower power consumption compared to traditional Deep Neural Networks (DNNs). Although still in its early stages, including methods for training models, this field is expected to advance further.

A particularly notable application of the high-speed capabilities of event cameras is vibration analysis and optical acoustic measurement techniques. Continuous vibration monitoring has long been required to detect early signs of critical issues such as wear, misalignment, and imbalance in machinery (17). Consequently, vibration measurement is actively conducted in the manufacturing sector using methods such as direct measurement with accelerometers and laser Doppler vibrometers, as well as monitoring vibration-induced sound and heat (43,51). The high-speed performance and ability of event cameras to ignore stationary background information make them ideal for efficiently capturing fine vibrations. Several techniques have been proposed in conjunction with noise reduction methods, and it has been demonstrated that this approach achieves performance comparable to expensive laser Doppler vibrometers (6,44,58).

Similarly, the ability to digitize subtle vibrations has shown that event cameras can replicate the functionality of the optical acoustic measurement method known as Visual Microphone, previously reliant on expensive high-speed cameras (20). Specific analyses of guitar strings and speaker diaphragms have been reported, demonstrating not only the reconstruction of sounds originating from vibrating objects but also spatial sound reconstruction. This application, traditionally requiring high-cost high-speed cameras, can now be achieved with significantly reduced costs through event cameras, greatly expanding its potential applications (47,60).

Another noteworthy application of event cameras is privacy-conscious activity monitoring in hospitals and care facilities. Event cameras, capable of functioning in low-light environments, can digitize the movements of individuals on beds or in hallways, regardless of time of day, thus helping reduce the operational burden on facility staff (1). This application leverages the fact that event cameras do not record color or brightness information, thus contributing to privacy protection. However, brightness changes are recorded as event frequencies, making some degree of information reconstruction possible (8,23,54,71,77). Therefore, like conventional cameras, careful consideration of privacy concerns is necessary for the use of event cameras.

## Biological Observation using Event Cameras

The challenges of conventional imaging technologies in biological measurements, as discussed earlier, can be addressed effectively by event cameras, which offer unique features. In recent years, applications of event cameras in the field of biology have begun to emerge, starting with cellular biology and gradually expanding into other areas.

This section aims to highlight four key reasons why biologists might find event cameras appealing: 1: high-speed performance, 2: low-light capability, 3: low power consumption and efficient storage, and 4: the ability to cancel motion blur. By presenting practical examples, this section provides information that can aid in the selection and application of event cameras for biological research.

### High-Speed Performance

Event cameras, often advertised as capable of achieving an equivalent of 10,000 fps, require careful consideration when capturing slow-moving objects. Due to the low frequency of event generation in such cases, applications like Particle Image Velocimetry (PIV) using tracer particles may encounter challenges, necessitating solutions such as the use of pulsed lasers (72,73). Therefore, if conventional high-speed cameras are available, they might be more suitable for such environments.

An effective example of event cameras in biological research is the analysis of periodic movements in organisms.

Takatsuka et al. proposed a method to analyze periodic biological movements using a two-step clustering approach similar to stream clustering. This method captures events representing the target object and performs frequency analysis to examine motion (66). They defined 21 biologically relevant parameters and successfully classified zooplankton and protozoa, primarily using frequency information. Additionally, the study utilized infrared light as an observational light source to minimize the impact on marine organisms, including zooplankton. This research highlights the integration of event cameras’ high-speed capabilities with the unique requirements of observing biological phenomena in the marine environment.

### Low-Light Capability
Biological measurements in darkness, such as in nocturnal forests or caves, are expected to benefit greatly from event cameras. Observing the behavior of organisms in the wild provides a unique opportunity to study their natural behavior and uncover their ecology within the natural environment. However, unlike controlled indoor experiments, field experiments face long-standing challenges such as fluctuating light levels and weather-dependent conditions, making stable, long-term observations difficult. Specifically, measuring biological behavior in darkness requires lighting with carefully controlled intensity and frequency that does not disturb the organisms, further restricting experimental setups. While infrared or thermal cameras have traditionally been used for these purposes, their time resolution is inversely related to exposure time, making it difficult to capture fine details of organismal movements.

Event cameras, which can capture movement even under low-light conditions and visualize only moving objects, act as biological pass filters in nighttime field studies. For instance, in observing bats flying in darkness, moving objects are typically limited to bats and their prey, such as insects. Both need to be tracked with a high signal-to-noise (S/N) ratio. Event cameras simplify tracking in such challenging scenes, enabling automatic calculation of features such as the distance between predator and prey or flight characteristics (Figure).

That said, if the sole purpose is to capture biological activity in low-light conditions, extending the exposure time of frame cameras or using infrared or thermal cameras may suffice. Event cameras are particularly advantageous when conventional cameras are unsuitable. In the case of bats, for example, event cameras are ideal due to their ability to capture the high-speed flight of bats and their prey, which may not be visible on thermal cameras.

Additionally, event cameras’ high dynamic range makes them advantageous for observations that need to be conducted both day and night. The “eventPenguin” project used an event camera by inivation to observe penguins’ ‘ecstatic display’ even in low-light conditions (30,31). Although limitations remain, such as separating head movements from other behaviors, the ability to process data consistently in both day and night settings offers significant advantages for nature-focused use cases.

Another promising application lies in visualizing particles within microfluidic devices—something high-sensitivity frame cameras cannot achieve. High-speed cameras paired with powerful lighting are typically required to track fast-moving particles, significantly limiting accessibility and scope (33). Event cameras, with their low-light capabilities, enable the capture of fast particles without the need for intense lighting, making them an ideal tool when additional information like particle color or brightness is of lesser importance. Similarly, for microscopic observations of biological particles such as phytoplankton, zooplankton, sperm cells, or other cells, light often becomes a major constraint in behavior analysis. The low-light performance of event cameras presents a significant breakthrough for biological observations, both in field and laboratory settings.

### Low Power Consumption and Efficient Storage
When the high-speed and low-light capabilities of event cameras are combined with their low power consumption and low storage requirements, their full potential is realized.

One of the most compelling use cases for event cameras in biological measurement is capturing fast movements in unpredictable scenarios. Since event cameras only output data when brightness changes occur, they maintain low power and storage consumption during periods of inactivity.

For example, observing flower-visiting insects often requires long-term, fixed-point monitoring, making it an ideal application for event cameras. In natural environments, storage and power supply are often limited. A system has been reported where event cameras act as triggers for frame cameras, reducing power and data usage while capturing appropriate images (25). While infrared sensors are typically used as triggers for larger organisms, they are unsuitable for insects. As a result, periodic imaging systems, such as those capturing frames every few seconds, have been proposed (45). By using event cameras as triggers, it becomes possible to capture images “when needed” and “at the necessary spatial and temporal resolution.” Although the system mentioned above uses the Event Vision System (EVS) solely as a trigger, combining it with methods that directly analyze event data could be particularly useful for studying insects, such as bees, that form communities and communicate through movement. A significant challenge, however, is managing background noise, such as swaying vegetation or rippling water, which requires appropriate noise reduction techniques.

Additionally, recording neural activity in biological systems often demands cameras capable of detecting subtle changes in light intensity at sampling rates ranging from 10 Hz to 1 kHz. While high-frame-rate, low-noise CMOS sensors are commonly used for this purpose, these sensors produce large amounts of data, making them unsuitable for long-term recording. In this context, event cameras, which combine high-speed performance, low power consumption, relatively low data rates, and high dynamic range, present an ideal solution (68).

### Cancel Motion Blur

Leveraging the sparse nature of event data is expected to make significant contributions to environmental monitoring for both industrial and academic purposes in marine settings.

Unlike terrestrial imaging, which is unaffected under clear conditions, underwater environments are always filled with particles, and the impact of suspended matter is particularly significant in coastal areas. Consequently, the removal of dynamic noise and accurate edge extraction of objects are critical challenges in marine sensing. Dynamic noise also poses problems in terrestrial settings, manifesting as rain or snow in images, which creates significant challenges for applications such as autonomous driving and infrastructure inspection. While deep learning techniques have been explored for noise removal in these scenarios (76), recent studies have begun integrating event data (9,78). The sparse nature of event data enables edge extraction of moving objects without temporal compression, allowing for the separation of static and dynamic backgrounds at low computational costs. This approach is expected to see widespread adoption in marine environmental sensing.

With the recent miniaturization of cameras, their use as sensors for biologging has increased. By attaching small cameras to animals, researchers can gain insights into their predation behaviors and habitats. Such information can also be utilized for environmental monitoring (80), enabling the collection of dynamic trajectory data of organisms, which was previously limited to Eulerian observations or Lagrangian observations using flow-following sensors. However, capturing images in low-light conditions can result in situations where objects are not visible or appear blurred due to limited shutter speed. Event cameras, by eliminating motion blur in such scenarios, could expand the scope of observation to include small particles like marine snow and plankton.

The ocean contains particles ranging in size from micrometers to tens of meters. These particles move through the marine space as a result of interactions driven by biological, chemical, and physical processes, facilitating the transport of various substances. Accurate acquisition of particle size distribution (PSD) is therefore essential. For smaller particles, observational methods based on conventional imaging are prone to significant errors due to the combined effects of limited pixel resolution and motion blur. Event cameras, with their high-speed capabilities, preserve the edges of moving objects and eliminate motion blur during particle imaging, enabling the capture of “high-contrast” particle data at the optical resolution limit.

We are currently conducting research and development to establish observational techniques for marine particles using this approach within moored systems.

![evsMarineSnow](posts/pics/review/evsMarineSnow.jpeg "evsMarineSnow")
Figure : Figure: Visualization of Results from evsMarineSnow

## Conclusion
Event cameras are paving the way for new observational domains that were challenging or impossible to achieve with conventional measurement technologies. For event cameras to be widely adopted in biological observation, it is crucial to establish a community-driven framework for research and development involving both manufacturers and researchers.

Open-source processing software tailored to event data is essential. In traditional image processing, OpenCV has become the de facto standard. However, no equivalent package exists for event data, leaving researchers to implement their own processing algorithms. While some foundational tools, such as the Event Vision Library and neuromorphic drivers, have been developed by individual researchers (59,65), they remain rudimentary.

In application-driven fields like biology, processing needs are often highly specific. Popular software packages such as ImageJ and DeepLabCut(42) are widely used due to their user-friendly GUI, extensibility, and broad applicability. For instance, DeepLabCut supports 3D tracking using data from multiple cameras (35,46). While Prophesee’s Metavision software has introduced 3D reconstruction capabilities in its latest version, its usability for non-expert users remains limited.

Developing easy-to-use packages for event data processing is a critical first step to expanding the use of event cameras in fields like ecology. evsCluster, an analysis software currently being developed in collaboration with Sony Group Corporation, aims to facilitate biological analysis using event data. Its features include tracking, extraction of biologically significant features, and deep learning based on extracted features. For example, it enables the calculation of periodic movements, such as wingbeats or flagellar motion, as frequencies.

Making such software widely accessible and usable will be indispensable for advancing the application of event cameras in biological research.

By exploring the application of event cameras in extreme environments, such as deep-sea and polar regions, the use cases introduced in this paper can be expanded further. This opens up the possibility of redefining biology from a new perspective, leveraging event cameras as a transformative imaging technology.


## Reference

1）Coram AI. Choosing the best security camera system for elderly monitoring, 2025. Accessed: 2025-01-09.

2）Filipp Akopyan, Jun Sawada, Andrew Cassidy, Rodrigo Alvarez-Icaza, et al. Truenorth: Design and tool flow of a 65 mw 1 million neuron programmable neurosynaptic chip. IEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems, 34(10):1537–1557, 2015.

3）Yusra Alkendi, Rana Azzam, Abdulla Ayyad, Sajid Javed, et al. Neuromorphic camera denoising using graph neural network-driven transformers. IEEE Transactions on Neural Networks and Learning Systems, 35(3):4110–4124, 2024.

4）Arnon Amir, Brian Taba, David Berg, Timothy Melano, et al. A low power, fully event-based gesture recognition system. In 2017 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), pages 7388–7397, 2017.

5）Asude Aydin, Mathias Gehrig, Daniel Gehrig, Davide Scaramuzza. A hybrid ann-snn architecture for low-power and low-latency visual perception. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 5701–5711, 2024.

6）Sofia Baldini, Riccardo Bernardini, Andrea Fusiello, Paolo Gardonio, et al. Measuring vibrations with event cameras. The International Archives of the Photogrammetry, Remote Sensing and Spatial Information Sciences, XLVIII-2/W7-2024:9–16, 2024.

7）Thomas Barbier, Céline Teulière, Jochen Triesch. Spike timing-based unsupervised learning of orientation, disparity, and motion representations in a spiking neural network. In 2021 IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPRW), pages 1377–1386, 2021.

8）Patrick Bardow, Andrew J. Davison, Stefan Leutenegger. Simultaneous optical flow and intensity estimation from an event camera. In 2016 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), pages 884–892, 2016.

9）Xiuwen Bi, Pengfei Wang, Wei Guo, Fusheng Zha, et al. RGB/event signal fusion framework for multi-degraded underwater image enhancement. Frontiers in Marine Science, 11:1366815, 2024.

10）Yin Bi, Aaron Chadha, Alhabib Abbas, Eirina Bourtsoulatze, Yiannis Andreopoulos. Graph-based object classification for neuromorphic vision sensing. In 2019 IEEE/CVF International Conference on Computer Vision (ICCV), pages 491–501, 2019.

11）G. Bradski. The opencv library. Dr. Dobb’s Journal of Software Tools, 2000.

12）Marta Braun. Picturing time: the work of Etienne-Jules Marey (1830-1904). University of Chicago Press, 1992.

13）Adam Brumm, Adhi Agus Oktaviana, Basran Burhan, Budianto Hakim, et al. Oldest cave art found in Sulawesi. Science Advances, 7(3):eabd4648, 2021.

14）Luis A Camuñas-Mesa, Bernabé Linares-Barranco, and Teresa Serrano-Gotarredona. Low-power hardware implementation of SNN with decision block for recognition tasks. In 2019 26th IEEE International Conference on Electronics, Circuits and Systems (ICECS), pages 73–76, 2019.

15）Leigh E Chadwick. A simple stroboscopic method for the study of insect flight. Psyche: A Journal of Entomology, 46(1):1–8, 1939.

16）Bharatesh Chakravarthi, Aayush Atul Verma, Kostas Daniilidis, Cornelia Fermuller, and Yezhou Yang. Recent event camera innovations: A survey. arXiv preprint arXiv:2408.13627, 2024.

17）Subimal Bikash Chaudhury, Mainak Sengupta, and Kaushik Mukherjee. Vibration monitoring of rotating machines using MEMS accelerometer. International journal of scientific engineering and research, 2(9):5–11, 2014.

18）Loïc Cordone, Benoît Miramond, and Philippe Thierion. Object detection with spiking neural networks on automotive event data. In 2022 International Joint Conference on Neural Networks (IJCNN), pages 1–8, 2022.

19）Mike Davies, Narayan Srinivasa, Tsung-Han Lin, Gautham Chinya, et al. Loihi: A neuromorphic manycore processor with on-chip learning. IEEE Micro, 38(1):82–99, 2018.

20）Abe Davis, Michael Rubinstein, Neal Wadhwa, Gautham J. Mysore, et al. The visual microphone: passive recovery of sound from video. ACM Transactions on Graphics, 33(4), 2014.

21）Yongjian Deng, Hao Chen, Hai Liu, and Youfu Li. A voxel graph CNN for object classification with event cameras. In 2022 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages 1162–1171, 2022.

22）Harold Eugene Edgerton and James Rhyne Killian. Flash! Seeing the Unseen by Ultra High-Speed Photography. Hale, Cushman & Flint, Boston, 1939.

23）Gereon Fox, Xingang Pan, Ayush Tewari, Mohamed Elgharib, and Christian Theobalt. Unsupervised event-based video reconstruction. In Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision (WACV), pages 4179–4188, January 2024.

24）Guillermo Gallego, Tobi Delbrück, Garrick Orchard, Chiara Bartolozzi, et al. Event-based vision: A survey. IEEE transactions on pattern analysis and machine intelligence, 44(1):154–180, 2020.

25）Eike Gebauer, Sebastian Thiele, Pierre Ouvrard, Adrien Sicard, and Benjamin Risse. Towards a dynamic vision sensor-based insect camera trap. In Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision, pages 7157–7166, 2024.

26）Daniel Gehrig and Davide Scaramuzza. Pushing the limits of asynchronous graph-based object detection with event cameras. ArXiv, abs/2211.12324, 2022.

27）Daniel Gehrig and Davide Scaramuzza. Low-latency automotive vision with event cameras. Nature, 629(8014):1034–1040, 2024.

28）Julie Grollier, Damien Querlioz, KY Camsari, Karin Everschor-Sitte, et al. Neuromorphic spintronics. Nature electronics, 3(7):360–370, 2020.

29）Ernst Haeckel and Bibliographisches Institut Leipzig. Kunstformen der Natur. Leipzig und Wien, Verlag des Bibliographischen Instituts, 1899–1904.

30）Friedhelm Hamann, Suman Ghosh, Ignacio Juárez Martínez, Tom Hart, Alex Kacelnik, and Guillermo Gallego. Fourier-based action recognition for wildlife behavior quantification with event cameras. Advanced Intelligent Systems, page 2400353, 2024.

31）Friedhelm Hamann, Suman Ghosh, Ignacio Juárez Martínez, Tom Hart, Alex Kacelnik, and Guillermo Gallego. Low-power, continuous remote behavioral localization with event cameras. In 2024 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages 18612–18621, 2024.

32）Friedhelm Hamann, Hanxiong Li, Paul Mieske, Lars Lewejohann, et al. Mousesis: A frames-and-events dataset for space-time instance segmentation of mice. arXiv preprint arXiv:2409.03358, 2024.

33）Jessie Howell, Tansy C. Hammarton, Yoann Altmann, and Melanie Jimenez. High-speed particle detection and tracking in microfluidic devices using event-based sensing. Lab Chip, 20:3024–3035, 2020.

34）Khadija Iddrisu, Waseem Shariff, Peter Corcoran, Noel E. O’Connor, et al. Event camera-based eye motion analysis: A survey. IEEE Access, 12:136783–136804, 2024.

35）Daniel Joska, Liam Clark, Naoya Muramatsu, Ricardo Jericevich, Fred Nicolls, et al. Acinoset: A 3D pose estimation dataset and baseline models for cheetahs in the wild, 2021.

36）Jacques Kaiser, J. Camilo Vasquez Tieck, Christian Hübschneider, Peter Wolf, Michael Weber, et al. Towards a framework for end-to-end control of a simulated vehicle with spiking neural networks. In 2016 IEEE International Conference on Simulation, Modeling, and Programming for Autonomous Robots (SIMPAR), pages 127–134, 2016.

37）Jürgen Kogler, Christoph Sulzbachner, Wilfried Kubinger. Bio-inspired stereo vision system with silicon retina imagers. In International Conference on Computer Vision Systems, pages 174–183. Springer, 2009.

38）Raphaela Kreiser, Alpha Renner, Vanessa RC Leite, Baris Serhan, et al. An on-chip spiking neural network for estimation of the head pose of the iCub robot. Frontiers in Neuroscience, 14:551, 2020.

39）R. L. Flashlight photographs of wild animals. Nature, 74(1924):489–490, Sep 1906.

40）Yijin Li, Han Zhou, Bangbang Yang, Ye Zhang, Zhaopeng Cui, et al. Graph-based asynchronous event processing for rapid object recognition. In 2021 IEEE/CVF International Conference on Computer Vision (ICCV), pages 914–923, 2021.

41）W. H. Longley. Life on a Coral Reef: The Fertility and Mystery of the Sea Studied Beneath the Waters Surrounding Dry Tortugas, volume 51. National Geographic Society, 1927.

42）Alexander Mathis, Pranav Mamidanna, Kevin M. Cury, Taiga Abe, et al. Deeplabcut: Markerless pose estimation of user-defined body parts with deep learning. Nature Neuroscience, 2018.

43）Mohamad Hazwan Mohd Ghazali and Wan Rahiman. Vibration analysis for machine monitoring and diagnosis: A systematic review. Shock and Vibration, 2021(1):9469318, 2021.

44）Woong-jae Na, Kyung Ho Sun, Byeong Chan Jeon, Jaeyun Lee, et al. Event-based micro vibration measurement using phase correlation template matching with event filter optimization. Measurement, 215:112867, 2023.

45）Mihoko Nagai, Yohei Higuchi, Yusei Ishikawa, Wei Guo, Tokihiro Fukatsu, et al. Periodically taken photographs reveal the effect of pollinator insects on seed set in lotus flowers. Scientific Reports, 12(1):11051, 2022.

46）Tanmay Nath, Alexander Mathis, An Chi Chen, Amir Patel, et al. Using Deeplabcut for 3D markerless pose estimation across species and behaviors. Nature protocols, 14(7):2152–2176, 2019.

47）Ryogo Niwa, Tatsuki Fushimi, Kenta Yamamoto, Yoichi Ochiai. Live demonstration: Event-based visual microphone. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) Workshops, pages 4054–4055, June 2023.

48）Garrick Orchard, Ryad Benosman, Ralph Etienne-Cummings, Nitish V. Thakor. A spiking neural network architecture for visual motion estimation. In 2013 IEEE Biomedical Circuits and Systems Conference (BioCAS), pages 298–301, 2013.

49）Marc Osswald, Sio-Hoi Ieng, Ryad Benosman, and Giacomo Indiveri. A spiking neural network model of 3D perception for event-based neuromorphic stereo vision systems. Scientific Reports, 7(1):40703, 2017.

50）Chethan M. Parameshwara, Simin Li, Cornelia Fermüller, Nitin J. Sanket, Matthew S. Evanusa, and Yiannis Aloimonos. Spikems: Deep spiking neural network for motion segmentation. In 2021 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), pages 3414–3420, 2021.

51）Robert Bond Randall. Vibration-based condition monitoring: Industrial, automotive and aerospace applications. John Wiley & Sons, 2021.

52）Sheldon C. Reed, C.M. Williams, and Leigh E. Chadwick. Frequency of wing-beat as a character for separating species races and geographic varieties of drosophila. Genetics, 27(3):349, 1942.

53）Simon Schaefer, Daniel Gehrig, and Davide Scaramuzza. Aegnn: Asynchronous event-based graph neural networks. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages 12371–12381, 2022.

54）Cedric Scheerlinck, Henri Rebecq, Daniel Gehrig, Nick Barnes, et al. Fast image reconstruction with an event camera. In 2020 IEEE Winter Conference on Applications of Computer Vision (WACV), pages 156–163, 2020.

55）Johannes Schindelin, Ignacio Arganda-Carreras, Erwin Frise, Verena Kaynig, et al. Fiji: An open-source platform for biological-image analysis. Nature Methods, 9(7):676–682, 2012.

56）Caroline A. Schneider, Wayne S. Rasband, and Kevin W. Eliceiri. NIH Image to ImageJ: 25 years of image analysis. Nature Methods, 9(7):671–675, 2012.

57）Waseem Shariff, Mehdi Sefidgar Dilmaghani, Paul Kielty, Mohamed Moustafa, et al. Event cameras in automotive sensing: A review. IEEE Access, 12:51275–51306, 2024.

58）Chenyang Shi, Ningfang Song, Boyi Wei, Yuzhen Li, et al. Event-based vibration frequency measurement with laser-assisted illumination based on mixture Gaussian distribution. IEEE Transactions on Instrumentation and Measurement, 72:1–13, 2023.

59）Shintaro Shiba. Event Vision Library, 2023. Accessed: 2025-01-22.

60）Ryo Shirakawa, Yoko Sogabe, Shiori Sugimoto, Ayumi Matsumoto, et al. High-resolution optical sound measurement based on vibration analysis with event camera. In Proceedings of the 22nd Forum on Information Technology (FIT), volume 3, pages 35–38, 2023.

61）Rasmus Stagsted, Antonio Vitale, Jonas Binz, Leon Bonde Larsen, et al. Towards neuromorphic control: A spiking neural network based PID controller for UAV. RSS, 2020.

62）J.D.B. Stillman, Eadweard Muybridge, and Leland Stanford. The Horse in Motion: As Shown by Instantaneous Photography; with a Study on Animal Mechanics Founded on Anatomy and the Revelations of the Camera; in Which is Demonstrated the Theory of Quadrupedal Locomotion. James R. Osgood and Company, Boston, 1882.

63）Evangelos Stromatias, Miguel Soto, Teresa Serrano-Gotarredona, Bernabé Linares-Barranco. An event-driven classifier for spiking neural networks fed with synthetic or dynamic vision sensor data. Frontiers in Neuroscience, 11:350, 2017.

64）Don E. Swann, Kae Kawanishi, and Jonathan Palmer. Evaluating types and features of camera traps in ecological studies: A guide for researchers. Camera Traps in Animal Ecology: Methods and Analyses, pages 27–43, 2011.

65）Neuromorphic Systems. Neuromorphic drivers, 2023. Accessed: 2025-01-22.

66）Susumu Takatsuka, Norio Miyamoto, Hidehito Sato, Yoshiaki Morino, et al. Millisecond-scale behaviours of plankton quantified in vitro and in situ using the event-based vision sensor. Ecology and Evolution, 14(8):e70150, 2024.

67）William Henry Fox Talbot. Album di disegni fotogenici. 1839. Collection of 36 salted paper prints.

68）Gemma Taverni, Diederik Paul Moeys, Fabian Friedrich Voigt, Chenghan Li, et al. In-vivo imaging of neural activity with dynamic vision sensors. In 2017 IEEE Biomedical Circuits and Systems Conference (BioCAS), pages 1–4, 2017.

69）Albert Van Helden. The invention of the telescope. Transactions of the American Philosophical Society, 67(4):1–67, 1977.

70）Anup Vanarse, Adam Osseiran, Alexander Rassau, and Peter van der Made. A hardware-deployable neuromorphic solution for encoding and classification of electronic nose data. Sensors, 19(22), 2019.

71）Lin Wang, I.S. Mohammad Mostafavi, Yo-Sung Ho, and Kuk-Jin Yoon. Event-based high dynamic range image and very high frame rate video generation using conditional generative adversarial networks. In 2019 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages 10073–10082, 2019.

72）Christian Willert. Event-based imaging velocimetry using pulsed illumination. Exp. Fluids, 64:98, 2023.

73）Christian Willert and Joachim Klinner. Event-based imaging velocimetry: An assessment of event-based cameras for the measurement of fluid flows. Exp. Fluids, 63:101, 2022.

74）Man Yao, Huanhuan Gao, Guangshe Zhao, Dingheng Wang, et al. Temporal-wise attention spiking neural networks for event streams classification. In Proceedings of the IEEE/CVF International Conference on Computer Vision, pages 10221–10230, 2021.

75）Masatoshi Yasuda and Kazuto Kawakami. New method of monitoring remote wildlife via the internet. Ecological Research, 17(1):119–124, 2002.

76）Rongyu Zhang, Yulin Luo, Jiaming Liu, Huanrui Yang, et al. Efficient deweather mixture-of-experts with uncertainty-aware feature-wise linear modulation. In Proceedings of the AAAI Conference on Artificial Intelligence, volume 38, pages 16812–16820, 2024.

77）Lin Zhu, Xiao Wang, Yi Chang, Jianing Li, et al. Event-based video reconstruction via potential-assisted spiking neural network. In 2022 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages 3584–3594, 2022.

78）Rong Zou, Manasi Muglikar, Nico Messikommer, and Davide Scaramuzza. Seeing behind dynamic occlusions with event cameras. arXiv preprint arXiv:2307.15829, 2023.

79）竹村嘉夫 and 豊田芳州. 自然写真50年史: ネイチャーフォト1500冊の歩み. 文一総合出版, 1995.

80）渡辺伸一, 野田琢嗣, 小泉拓也, 依田憲, et al. Biologging intelligent platform (BIP) により実現するバイオロギングデータの共有と海洋の可視化. 日本生態学会誌, 73(1):9–22, 2023.
