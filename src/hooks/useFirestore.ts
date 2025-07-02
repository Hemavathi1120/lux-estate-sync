
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy,
  where,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useFirestore<T>(
  collectionName: string, 
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(constraints)]);

  const add = async (item: Omit<T, 'id'>) => {
    try {
      await addDoc(collection(db, collectionName), item);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const update = async (id: string, updates: Partial<T>) => {
    try {
      await updateDoc(doc(db, collectionName, id), updates);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { data, loading, error, add, update, remove };
}
