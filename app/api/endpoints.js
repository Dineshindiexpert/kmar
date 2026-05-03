'use client';
import axios from 'axios';

const authentication = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MOCK_API
});

export const apiService = {
    getUsers: () => authentication.get('/authentication'),
    getUserById: (id) => authentication.get(`/authentication/${id}`),
    createUser: (data) => authentication.post('/authentication', data),
    updateUser: (id, data) => authentication.put(`/authentication/${id}`, data),
    deleteUser: (id) => authentication.delete(`/authentication/${id}`)
};