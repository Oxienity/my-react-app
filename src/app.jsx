import React, { useState } from 'react';
import { Users, FileText, Activity, Database, Code, Workflow } from 'lucide-react';

const DigitalSafehouseDesign = () => {
  const [activeTab, setActiveTab] = useState('actors');

  const tabs = [
    { id: 'actors', name: 'Aktor & Use Cases', icon: Users },
    { id: 'scenarios', name: 'Skenario Use Case', icon: FileText },
    { id: 'activity', name: 'Activity Diagram', icon: Activity },
    { id: 'sequence', name: 'Sequence Diagram', icon: Workflow },
    { id: 'database', name: 'Database Schema', icon: Database },
    { id: 'class', name: 'Class Diagram', icon: Code }
  ];

  const actors = {
    list: [
      { name: 'Pengguna Anonim', desc: 'Pengunjung yang tidak login' },
      { name: 'User (Pengguna Terdaftar)', desc: 'Pengguna yang sudah registrasi dan login' },
      { name: 'Ahli/Expert', desc: 'Profesional etika digital yang memberikan konsultasi' },
      { name: 'Administrator', desc: 'Pengelola sistem' }
    ],
    useCases: [
      { actor: 'Pengguna Anonim', cases: ['Membaca Artikel', 'Mengajukan Pertanyaan Anonim', 'Melihat Forum Diskusi', 'Berpartisipasi di Forum'] },
      { actor: 'User Terdaftar', cases: ['Registrasi & Login', 'Booking Konsultasi Privat', 'Melihat Riwayat Konsultasi', 'Menerima Notifikasi', 'Semua fitur Pengguna Anonim'] },
      { actor: 'Ahli', cases: ['Login Sistem', 'Mengelola Jadwal Ketersediaan', 'Menjawab Pertanyaan Anonim', 'Melayani Konsultasi Privat', 'Menulis Artikel', 'Melihat Riwayat Konsultasi'] },
      { actor: 'Administrator', cases: ['Mengelola User & Ahli (CRUD)', 'Menugaskan Pertanyaan ke Ahli', 'Moderasi Konten Forum', 'Moderasi Artikel', 'Melihat Laporan Statistik'] }
    ]
  };

  const scenarios = [
    {
      title: 'UC-01: Mengajukan Pertanyaan Anonim',
      actor: 'Pengguna Anonim',
      precondition: 'Pengguna mengakses halaman konsultasi anonim',
      steps: [
        'Pengguna mengisi form pertanyaan (kategori, deskripsi masalah)',
        'Sistem memvalidasi input',
        'Sistem menyimpan pertanyaan dengan ID unik (tanpa data pribadi)',
        'Sistem menampilkan pesan konfirmasi dan ID tracking',
        'Sistem mengirim notifikasi ke Admin untuk penugasan'
      ],
      postcondition: 'Pertanyaan tersimpan dan menunggu respons ahli'
    },
    {
      title: 'UC-02: Booking Konsultasi Privat',
      actor: 'User Terdaftar',
      precondition: 'User sudah login',
      steps: [
        'User memilih ahli dari daftar yang tersedia',
        'User melihat jadwal ketersediaan ahli',
        'User memilih slot waktu yang diinginkan',
        'User memilih metode konsultasi (chat/video call)',
        'Sistem memproses pembayaran (jika berbayar)',
        'Sistem mengkonfirmasi booking',
        'Sistem mengirim notifikasi ke User dan Ahli'
      ],
      postcondition: 'Sesi konsultasi terjadwal dan kedua pihak menerima notifikasi'
    },
    {
      title: 'UC-03: Menjawab Pertanyaan Anonim',
      actor: 'Ahli',
      precondition: 'Admin telah menugaskan pertanyaan ke Ahli',
      steps: [
        'Ahli menerima notifikasi pertanyaan baru',
        'Ahli login dan melihat detail pertanyaan',
        'Ahli menulis jawaban/rekomendasi',
        'Ahli mensubmit jawaban',
        'Sistem menyimpan jawaban',
        'Sistem mengirim notifikasi ke penanya (via ID tracking)'
      ],
      postcondition: 'Jawaban tersimpan dan penanya dapat melihat respons'
    }
  ];

  const databaseTables = [
    {
      name: 'users',
      columns: [
        { name: 'user_id', type: 'INT', key: 'PK', desc: 'Primary key' },
        { name: 'username', type: 'VARCHAR(50)', key: 'UNIQUE', desc: 'Username unik' },
        { name: 'email', type: 'VARCHAR(100)', key: 'UNIQUE', desc: 'Email terenkripsi' },
        { name: 'password_hash', type: 'VARCHAR(255)', key: '', desc: 'Password terenkripsi' },
        { name: 'role', type: 'ENUM', key: '', desc: 'user, expert, admin' },
        { name: 'full_name', type: 'VARCHAR(100)', key: '', desc: 'Nama lengkap' },
        { name: 'created_at', type: 'TIMESTAMP', key: '', desc: 'Waktu registrasi' }
      ]
    },
    {
      name: 'experts',
      columns: [
        { name: 'expert_id', type: 'INT', key: 'PK', desc: 'Primary key' },
        { name: 'user_id', type: 'INT', key: 'FK', desc: 'Foreign key ke users' },
        { name: 'specialization', type: 'VARCHAR(100)', key: '', desc: 'Bidang keahlian' },
        { name: 'bio', type: 'TEXT', key: '', desc: 'Biografi' },
        { name: 'is_available', type: 'BOOLEAN', key: '', desc: 'Status ketersediaan' },
        { name: 'hourly_rate', type: 'DECIMAL(10,2)', key: '', desc: 'Tarif per jam' }
      ]
    },
    {
      name: 'anonymous_questions',
      columns: [
        { name: 'question_id', type: 'INT', key: 'PK', desc: 'Primary key' },
        { name: 'tracking_id', type: 'VARCHAR(50)', key: 'UNIQUE', desc: 'ID tracking untuk penanya' },
        { name: 'category', type: 'VARCHAR(50)', key: '', desc: 'Kategori pertanyaan' },
        { name: 'question_text', type: 'TEXT', key: '', desc: 'Isi pertanyaan' },
        { name: 'status', type: 'ENUM', key: '', desc: 'pending, assigned, answered' },
        { name: 'assigned_expert_id', type: 'INT', key: 'FK', desc: 'Ahli yang ditugaskan' },
        { name: 'created_at', type: 'TIMESTAMP', key: '', desc: 'Waktu dibuat' }
      ]
    },
    {
      name: 'consultations',
      columns: [
        { name: 'consultation_id', type: 'INT', key: 'PK', desc: 'Primary key' },
        { name: 'user_id', type: 'INT', key: 'FK', desc: 'User yang booking' },
        { name: 'expert_id', type: 'INT', key: 'FK', desc: 'Ahli yang dipilih' },
        { name: 'scheduled_at', type: 'DATETIME', key: '', desc: 'Waktu konsultasi' },
        { name: 'method', type: 'ENUM', key: '', desc: 'chat, video_call' },
        { name: 'status', type: 'ENUM', key: '', desc: 'scheduled, completed, cancelled' },
        { name: 'payment_status', type: 'ENUM', key: '', desc: 'pending, paid, refunded' }
      ]
    },
    {
      name: 'articles',
      columns: [
        { name: 'article_id', type: 'INT', key: 'PK', desc: 'Primary key' },
        { name: 'author_id', type: 'INT', key: 'FK', desc: 'Penulis (admin/expert)' },
        { name: 'title', type: 'VARCHAR(200)', key: '', desc: 'Judul artikel' },
        { name: 'content', type: 'TEXT', key: '', desc: 'Isi artikel' },
        { name: 'category', type: 'VARCHAR(50)', key: '', desc: 'Kategori' },
        { name: 'is_published', type: 'BOOLEAN', key: '', desc: 'Status publikasi' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Digital SafeHouse</h1>
          <p className="text-gray-600">Dokumentasi Desain Sistem - Platform Konsultasi Etika Digital</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-indigo-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          <div className="p-8">
            {activeTab === 'actors' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Identifikasi Aktor dan Use Cases</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4">Daftar Aktor</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {actors.list.map((actor, idx) => (
                      <div key={idx} className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
                        <h4 className="font-bold text-indigo-900">{actor.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{actor.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4">Use Cases per Aktor</h3>
                  {actors.useCases.map((item, idx) => (
                    <div key={idx} className="mb-6 border-l-4 border-indigo-600 pl-4">
                      <h4 className="font-bold text-gray-800 mb-2">{item.actor}</h4>
                      <ul className="space-y-1">
                        {item.cases.map((uc, i) => (
                          <li key={i} className="text-gray-700">• {uc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'scenarios' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Skenario Use Case Detail</h2>
                <div className="space-y-6">
                  {scenarios.map((scenario, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-indigo-900">{scenario.title}</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                          {scenario.actor}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700">Precondition:</p>
                        <p className="text-gray-600">{scenario.precondition}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Main Flow:</p>
                        <ol className="space-y-2">
                          {scenario.steps.map((step, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">
                                {i + 1}
                              </span>
                              <span className="text-gray-700 pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-700">Postcondition:</p>
                        <p className="text-gray-600">{scenario.postcondition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Diagram</h2>
                <div className="space-y-8">
                  <div className="border border-gray-300 rounded-lg p-6 bg-white">
                    <h3 className="text-lg font-bold text-indigo-900 mb-4">Activity: Booking Konsultasi Privat</h3>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">Start</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-64 p-4 bg-blue-100 border-2 border-blue-500 rounded text-center">Login User</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-64 p-4 bg-blue-100 border-2 border-blue-500 rounded text-center">Pilih Ahli</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-64 p-4 bg-blue-100 border-2 border-blue-500 rounded text-center">Lihat Jadwal Ketersediaan</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-64 p-4 bg-yellow-100 border-2 border-yellow-500 rounded text-center font-semibold">Pilih Slot Waktu</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-64 p-4 bg-blue-100 border-2 border-blue-500 rounded text-center">Pilih Metode Konsultasi</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-64 p-4 bg-blue-100 border-2 border-blue-500 rounded text-center">Proses Pembayaran</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-64 p-4 bg-blue-100 border-2 border-blue-500 rounded text-center">Konfirmasi Booking</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-64 p-4 bg-blue-100 border-2 border-blue-500 rounded text-center">Kirim Notifikasi</div>
                      <div className="w-0.5 h-8 bg-gray-400"></div>
                      <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">End</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sequence' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sequence Diagram</h2>
                <div className="space-y-8">
                  <div className="border border-gray-300 rounded-lg p-6 bg-white">
                    <h3 className="text-lg font-bold text-indigo-900 mb-6">Sequence: Mengajukan Pertanyaan Anonim</h3>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Actors: Pengguna → UI → Controller → Database → Notif Service</p>
                      <div className="mt-4 space-y-2 pl-4">
                        <p>1. Pengguna → UI: Isi form pertanyaan</p>
                        <p>2. UI → Controller: Submit pertanyaan</p>
                        <p>3. Controller → Controller: Validasi data</p>
                        <p>4. Controller → Controller: Generate tracking_id</p>
                        <p>5. Controller → Database: Simpan pertanyaan</p>
                        <p>6. Database → Controller: Konfirmasi simpan</p>
                        <p>7. Controller → Notif Service: Kirim notif ke Admin</p>
                        <p>8. Controller → UI: Return tracking_id</p>
                        <p>9. UI → Pengguna: Tampilkan konfirmasi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Database Schema</h2>
                
                <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h3 className="font-semibold text-indigo-900 mb-2">Relasi Antar Tabel:</h3>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• users (1) → (N) consultations</li>
                    <li>• experts (1) → (N) consultations</li>
                    <li>• experts (1) → (N) anonymous_questions</li>
                    <li>• users (1) → (N) articles</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  {databaseTables.map((table, idx) => (
                    <div key={idx} className="border border-gray-300 rounded-lg overflow-hidden">
                      <div className="bg-indigo-600 text-white p-4">
                        <h3 className="text-lg font-bold">{table.name}</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Column</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Key</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.columns.map((col, i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-3 text-sm font-mono text-gray-800">{col.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{col.type}</td>
                                <td className="px-4 py-3">
                                  {col.key && (
                                    <span className={`px-2 py-1 text-xs rounded ${
                                      col.key === 'PK' ? 'bg-green-100 text-green-700' :
                                      col.key === 'FK' ? 'bg-blue-100 text-blue-700' :
                                      'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      {col.key}
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{col.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'class' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Class Diagram</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-indigo-600 rounded-lg overflow-hidden">
                    <div className="bg-indigo-600 text-white p-3 font-bold">User</div>
                    <div className="bg-indigo-50 p-3 border-b border-indigo-200">
                      <p className="text-sm font-semibold mb-2">Attributes:</p>
                      <p className="text-sm font-mono">- userId: int</p>
                      <p className="text-sm font-mono">- username: string</p>
                      <p className="text-sm font-mono">- email: string</p>
                      <p className="text-sm font-mono">- passwordHash: string</p>
                      <p className="text-sm font-mono">- role: enum</p>
                    </div>
                    <div className="bg-white p-3">
                      <p className="text-sm font-semibold mb-2">Methods:</p>
                      <p className="text-sm font-mono">+ register()</p>
                      <p className="text-sm font-mono">+ login()</p>
                      <p className="text-sm font-mono">+ updateProfile()</p>
                    </div>
                  </div>

                  <div className="border-2 border-green-600 rounded-lg overflow-hidden">
                    <div className="bg-green-600 text-white p-3 font-bold">Expert</div>
                    <div className="bg-green-50 p-3 border-b border-green-200">
                      <p className="text-sm font-semibold mb-2">Attributes:</p>
                      <p className="text-sm font-mono">- expertId: int</p>
                      <p className="text-sm font-mono">- userId: int</p>
                      <p className="text-sm font-mono">- specialization: string</p>
                      <p className="text-sm font-mono">- isAvailable: boolean</p>
                    </div>
                    <div className="bg-white p-3">
                      <p className="text-sm font-semibold mb-2">Methods:</p>
                      <p className="text-sm font-mono">+ manageSchedule()</p>
                      <p className="text-sm font-mono">+ answerQuestion()</p>
                      <p className="text-sm font-mono">+ writeArticle()</p>
                    </div>
                  </div>

                  <div className="border-2 border-purple-600 rounded-lg overflow-hidden">
                    <div className="bg-purple-600 text-white p-3 font-bold">AnonymousQuestion</div>
                    <div className="bg-purple-50 p-3 border-b border-purple-200">
                      <p className="text-sm font-semibold mb-2">Attributes:</p>
                      <p className="text-sm font-mono">- questionId: int</p>
                      <p className="text-sm font-mono">- trackingId: string</p>
                      <p className="text-sm font-mono">- questionText: string</p>
                      <p className="text-sm font-mono">- status: enum</p>
                    </div>
                    <div className="bg-white p-3">
                      <p className="text-sm font-semibold mb-2">Methods:</p>
                      <p className="text-sm font-mono">+ submit()</p>
                      <p className="text-sm font-mono">+ assignToExpert()</p>
                    </div>
                  </div>

                  <div className="border-2 border-yellow-600 rounded-lg overflow-hidden">
                    <div className="bg-yellow-600 text-white p-3 font-bold">Consultation</div>
                    <div className="bg-yellow-50 p-3 border-b border-yellow-200">
                      <p className="text-sm font-semibold mb-2">Attributes:</p>
                      <p className="text-sm font-mono">- consultationId: int</p>
                      <p className="text-sm font-mono">- userId: int</p>
                      <p className="text-sm font-mono">- expertId: int</p>
                      <p className="text-sm font-mono">- scheduledAt: datetime</p>
                    </div>
                    <div className="bg-white p-3">
                      <p className="text-sm font-semibold mb-2">Methods:</p>
                      <p className="text-sm font-mono">+ book()</p>
                      <p className="text-sm font-mono">+ cancel()</p>
                      <p className="text-sm font-mono">+ complete()</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 border border-gray-300 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-4">Relasi Antar Class:</h3>
                  <div className="space-y-2 text-sm">
                    <p>• User has-a Expert (1:1)</p>
                    <p>• User has-many Consultation (1:N)</p>
                    <p>• Expert has-many Consultation (1:N)</p>
                    <p>• Expert has-many AnonymousQuestion (1:N)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSafehouseDesign;