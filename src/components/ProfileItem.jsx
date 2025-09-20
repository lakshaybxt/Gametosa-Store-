import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProfileItem = ({ icon: Icon, label, action }) => {
  return (
    <button
      onClick={action}
      className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors"
    >
      <div className="flex items-center">
        <Icon className="w-5 h-5 text-white mr-3" />
        <span className="text-white font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-white" />
    </button>
  );
};

export default ProfileItem;
