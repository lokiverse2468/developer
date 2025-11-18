'use client';

import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="confirm-dialog-overlay"
      onClick={onCancel}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="confirm-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: '1rem',
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#374151',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            marginBottom: '1.5rem',
            color: '#6b7280',
            lineHeight: '1.5',
          }}
        >
          {message}
        </p>
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onCancel}
            className="btn btn-secondary"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              color: '#374151',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-primary"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

