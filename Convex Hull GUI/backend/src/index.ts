import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface Point {
  lat: number;
  lng: number;
}

// Graham Scan algorithm for Convex Hull
function convexHull(points: Point[]): Point[] {
  if (points.length < 3) return points;

  // Find the point with the lowest y-coordinate (and leftmost if tied)
  const lowestPoint = points.reduce((lowest, point) => {
    if (point.lat < lowest.lat || (point.lat === lowest.lat && point.lng < lowest.lng)) {
      return point;
    }
    return lowest;
  });

  // Sort points by polar angle with lowestPoint
  const sortedPoints = points
    .filter(point => point !== lowestPoint)
    .sort((a, b) => {
      const angleA = Math.atan2(a.lat - lowestPoint.lat, a.lng - lowestPoint.lng);
      const angleB = Math.atan2(b.lat - lowestPoint.lat, b.lng - lowestPoint.lng);
      return angleA - angleB;
    });

  // Initialize stack with lowest point and first point
  const stack: Point[] = [lowestPoint, sortedPoints[0]];

  // Graham scan
  for (let i = 1; i < sortedPoints.length; i++) {
    while (
      stack.length >= 2 &&
      !isLeftTurn(
        stack[stack.length - 2],
        stack[stack.length - 1],
        sortedPoints[i]
      )
    ) {
      stack.pop();
    }
    stack.push(sortedPoints[i]);
  }

  return stack;
}

// Helper function to determine if three points make a left turn
function isLeftTurn(p1: Point, p2: Point, p3: Point): boolean {
  const crossProduct = (p2.lng - p1.lng) * (p3.lat - p1.lat) -
                      (p2.lat - p1.lat) * (p3.lng - p1.lng);
  return crossProduct > 0;
}

app.post('/api/convex-hull', (req, res) => {
  try {
    const { coordinates } = req.body;
    
    if (!Array.isArray(coordinates) || coordinates.length < 3) {
      return res.status(400).json({
        error: 'At least 3 points are required to calculate a convex hull'
      });
    }

    const hull = convexHull(coordinates);
    res.json({ hull });
  } catch (error) {
    console.error('Error calculating convex hull:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 