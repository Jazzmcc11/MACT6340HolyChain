-- MySQL dump 10.13  Distrib 9.5.0, for macos15.7 (arm64)
--
-- Host: localhost    Database: holychain_db
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `playlist_url` varchar(255) DEFAULT NULL,
  `blurb` text,
  `scripture` varchar(255) DEFAULT NULL,
  `walkout_song` varchar(255) DEFAULT NULL,
  `secondary_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'The Delilah Mixtape: Soft Hands, Sharp Intentions','Exploring seduction, survival, and strategy across eras and genres.','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Delilah.png','https://example.com/delilah','https://music.apple.com/us/playlist/the-delilah-mixtape-soft-hands-sharp-intentions/pl.u-ZmblXgrCKo5Wy','Delilah is often remembered only as Samson’s downfall, but her story holds far more complexity than betrayal alone. Found in Judges 13–16, she lived in the Valley of Sorek, a liminal space between Israelite and Philistine worlds—already positioned at a crossroads of power, loyalty, and survival. This mixtape reimagines Delilah not as a one-dimensional villain, but as a woman navigating desire, influence, and consequence. Across decades of sound and style, her energy shifts with the times, yet remains rooted in strategy and agency. Through soul, funk, R&B, and contemporary music, this project explores how Delilah’s story might feel if told through culture rather than condemnation—soft, dangerous, and intentional all at once.',NULL,'Love to Love You Baby – Donna Summer','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Delilah2.png'),(2,'The Esther Mixtape: For Such a Time','A reflection on power, preparation, and divine timing through soulful sound.','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Esther.png','https://example.com/esther','https://music.apple.com/us/playlist/the-esther-mixtape-for-such-a-time/pl.u-LdbqAGvT9eqDL','Esther’s story is one of quiet positioning and courageous timing. Found in the Book of Esther, she was a Jewish woman who rose to become queen of Persia and used her influence to save her people from destruction. Living within one of the largest empires the world had ever known, Esther learned when to remain silent and when to speak with boldness. This mixtape reimagines her not as loud or forceful, but as loyal, composed, and strategically brave—powerful in restraint and unwavering in purpose. Her story reminds us that strength does not always announce itself; sometimes it waits, prepares, and steps forward exactly when it matters most.',NULL,'Rise Up – Andra Day','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Esther2.png'),(3,'The Eve Mixtape: Vol. O.G.','Tracing the original woman’s complexity, temptation, and rebirth through sound.','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Eve.png','https://example.com/eve','https://music.apple.com/us/playlist/the-eve-mixtape-vol-o-g/pl.u-6mo4NgZu2Gm3M','Eve is the beginning. The first woman, the mother of humanity, and the origin of choice. Found in Genesis, her story is often reduced to blame, but this mixtape reimagines Eve as intuitive, curious, and unapologetically human. She is natural, grounded, and willing to learn through experience—even when the outcome is uncertain. This project honors Eve not as the fall, but as the first to question, the first to feel, and the first to step into consequence with her eyes open.',NULL,'Bag Lady – Erykah Badu','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Eve2.png'),(4,'The Magdalene Mixtape: Vol. Ho','Part I of Mary Magdalene’s duality — a woman misunderstood, yet magnetic.','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/MM.png','https://example.com/mm','https://music.apple.com/us/playlist/the-magdalene-mixtape-vol-hoe/pl.u-BNA6gB3FGmqJB','Mary Magdalene is often remembered through rumor and projection, reduced to desire without understanding. Referenced in Luke 7:36–50 and Luke 8:1–3, her story places her in rooms where she was watched, judged, and talked about—yet fully present in her body and humanity. This mixtape reimagines Mary before healing and before redemption, as a woman who was visible, magnetic, and culturally loaded. It explores how desire, reputation, and femininity are shaped by the gaze of others, and how her story holds space for complexity long before transformation begins.',NULL,'Sweetest Taboo – Sade','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/MM2.png'),(5,'The Magdalene Mixtape: Vol. Healed','Part II of Mary Magdalene’s evolution — grace, softness, and redemption.','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/MMH.png','https://example.com/mmh','https://music.apple.com/us/playlist/the-magdalene-mixtape-vol-healed/pl.u-6mo4NRvs2Gm3M','Mary Magdalene’s healing is not about erasing her past, but reclaiming herself fully. Referenced throughout the Gospels, her story shifts from being defined by reputation to being rooted in devotion, restoration, and love. This chapter reimagines Mary in her healed era—at peace, self-assured, and deeply grounded. She is no longer carrying shame or performing for approval. Instead, she exists in wholeness, joy, and quiet confidence, embodying what it looks like to choose yourself after transformation.',NULL,'Blessed – Jill Scott','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/MM3.png'),(6,'The Ruth Mixtape: Worth The Wait','A testament to loyalty, grief, and divine love rewritten as modern devotion.','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Ruth.png','https://example.com/ruth','https://music.apple.com/us/playlist/the-ruth-mixtape-worth-the-wait/pl.u-LdbqA64F9eqDL','Ruth’s story is rooted in loyalty, work, and quiet faithfulness. Found in the Book of Ruth, she chose commitment over convenience, staying when it would have been easier to leave. Through consistency and labor, Ruth built a life grounded in devotion—first to family, then to purpose. This mixtape reimagines Ruth not as passive, but as steady and resilient, showing how faith is often lived out in the ordinary. Her story reminds us that sometimes the most powerful love stories begin with choosing to stay, work, and trust the process.',NULL,'I Won\'t Complain – Rev. Paul Jones','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Ruth2.png'),(7,'The Sarah Mixtape: Legacy and Laughter','Generational faith, waiting, and joy — celebrating promises fulfilled.','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Sarah.png','https://example.com/sarah','https://music.apple.com/us/playlist/the-sarah-mixtape-laughter-legacy/pl.u-Ymb0Kr5s79a4p','Sarah’s story, found in Genesis 17–21, is one of faith stretched over time and joy that arrives exactly when promised. She waited through uncertainty, doubt, and delay, trusting that what was spoken over her life would come to pass. When the promise was finally fulfilled, her response was laughter—not disbelief, but awe. This mixtape reimagines Sarah as a woman who held onto faith even when the timeline didn’t make sense, celebrating the beauty of promises kept and joy that comes after waiting.',NULL,'Hold On – Sounds of Blackness','https://amjm.nyc3.cdn.digitaloceanspaces.com/images/Sarah2.png');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 17:21:56
