'use client';

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

type Item = {
  id: number;
  image: string;
  alt: string;
  source: string;
  nutrition: string;
};