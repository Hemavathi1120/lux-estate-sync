
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
  QueryConstraint,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useFirestore<T extends DocumentData>(
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
        } as unknown as T));
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
      await addDoc(collection(db, collectionName), item as DocumentData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const update = async (id: string, updates: Partial<Omit<T, 'id'>>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updates as DocumentData);
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
