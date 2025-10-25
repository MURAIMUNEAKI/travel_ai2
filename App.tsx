import React, { useState, useCallback } from 'react';
import type { DestinationSummary } from './types';
import { fetchSummaries } from './services/geminiService';

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.053l.004-.006c3.416-5.4 3.416-11.313 0-16.715a8.25 8.25 0 10-11.667 11.667l.004.006a16.975 16.975 0 005.16 4.053zM12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
    <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.006 1.524 3.747 3.747 0 01-1.524-3.006c0-.507.1-.996.292-1.458z" />
  </svg>
);

const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
);

const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
    </svg>
);

const ArrowUturnLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600"></div>
  </div>
);

interface LocationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  placeholder: string;
  index: number;
  canRemove: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange, onRemove, placeholder, index, canRemove }) => (
    <div className="flex items-center gap-2">
        <div className="relative flex-grow">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MapPinIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-slate-400 sm:text-sm">{index + 1}</span>
            </div>
        </div>
        {canRemove && (
            <button type="button" onClick={onRemove} className="text-slate-400 hover:text-red-500 transition-colors">
                <XCircleIcon className="h-6 w-6" />
            </button>
        )}
    </div>
);

interface ResultCardProps {
    summary: DestinationSummary;
}

const ResultCard: React.FC<ResultCardProps> = ({ summary }) => (
    <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg ring-1 ring-black/5 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-sky-800 mb-2 flex items-center">
            <MapPinIcon className="h-6 w-6 mr-2" />
            {summary.destination}
        </h3>
        <p className="text-slate-700 leading-relaxed">{summary.summary}</p>
    </div>
);

interface MapDisplayProps {
    url: string;
    onBack: () => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ url, onBack }) => (
    <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto relative">
        <iframe
            src={url}
            className="w-full h-full border-0 rounded-2xl shadow-2xl"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <button onClick={onBack} className="absolute top-4 right-4 flex items-center gap-2 bg-white/60 backdrop-blur-lg text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-lg ring-1 ring-black/5 hover:bg-white/80 transition-all duration-300">
            <ArrowUturnLeftIcon className="h-5 w-5" />
            入力に戻る
        </button>
    </div>
);

function App() {
  const [destinations, setDestinations] = useState<string[]>(['金閣寺', '銀閣寺', '京都 清水寺']);
  const [summaries, setSummaries] = useState<DestinationSummary[]>([]);
  const [mapUrl, setMapUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'input' | 'results'>('input');

  const handleInputChange = useCallback((index: number, value: string) => {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    setDestinations(newDestinations);
  }, [destinations]);

  const handleAddDestination = () => {
    if (destinations.length < 5) {
      setDestinations([...destinations, '']);
    }
  };

  const handleRemoveDestination = (index: number) => {
    if (destinations.length > 2) {
      const newDestinations = destinations.filter((_, i) => i !== index);
      setDestinations(newDestinations);
    }
  };
  
  const handleBackToInput = () => {
      setView('input');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validDestinations = destinations.filter(d => d.trim() !== '');
    if (validDestinations.length < 2) {
      setError('観光地を2か所以上入力してください。');
      return;
    }
    setLoading(true);
    setError(null);
    setSummaries([]);
    setMapUrl('');

    try {
      const encodedDests = validDestinations.map(d => encodeURIComponent(d.trim()));
      
      let url = '';
      if (encodedDests.length === 1) {
        url = `https://maps.google.com/maps?q=${encodedDests[0]}&output=embed&z=12`;
      } else if (encodedDests.length > 1) {
        const origin = encodedDests[0];
        const destinationAndWaypoints = encodedDests.slice(1);
        const daddr = destinationAndWaypoints.join('+to:');
        url = `https://maps.google.com/maps?saddr=${origin}&daddr=${daddr}&output=embed`;
      }
      
      if (url) {
        setMapUrl(url);
      } else {
        setError("地図を表示するための観光地が不足しています。");
        setLoading(false);
        return;
      }

      const result = await fetchSummaries(validDestinations);
      setSummaries(result);
      setView('results');

    } catch (err) {
      setError(err instanceof Error ? err.message : '情報の取得中にエラーが発生しました。もう一度お試しください。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const renderInputView = () => (
    <>
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-sky-800 tracking-tight">観光AIプランナー</h1>
        <p className="mt-4 text-lg text-slate-600">行ってみたい場所を2～5か所を入力して、旅の計画を始めよう！</p>
      </header>

      <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-lg ring-1 ring-black/5">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
              {destinations.map((dest, index) => (
                  <LocationInput
                      key={index}
                      value={dest}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onRemove={() => handleRemoveDestination(index)}
                      placeholder={`観光地 ${index + 1}`}
                      index={index}
                      canRemove={destinations.length > 2}
                  />
              ))}
          </div>
          {destinations.length < 5 && (
            <button
                type="button"
                onClick={handleAddDestination}
                className="w-full flex items-center justify-center gap-x-2 rounded-md bg-slate-100/70 px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-200/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 mb-4 transition-colors"
            >
                <PlusCircleIcon className="h-5 w-5" />
                観光地を追加
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-x-2 rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <SparklesIcon className="h-5 w-5" />
            {loading ? '生成中...' : 'プランを生成する'}
          </button>
        </form>
      </div>
    </>
  );

  const renderResultsView = () => (
    summaries.length > 0 && mapUrl && (
        <div className="animate-[fadeIn_1s_ease-in-out]">
            <div className="flex flex-col lg:flex-row gap-8">
                <MapDisplay url={mapUrl} onBack={handleBackToInput}/>
                <div className="w-full lg:w-1/2 space-y-6">
                    {summaries.map((summary, index) => (
                        <ResultCard key={index} summary={summary} />
                    ))}
                </div>
            </div>
        </div>
    )
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 text-slate-800 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">

        {view === 'input' && renderInputView()}
        
        {loading && <LoadingSpinner />}

        {error && !loading &&(
            <div className="mt-8 max-w-2xl mx-auto bg-red-100/80 backdrop-blur-sm border border-red-400 text-red-700 px-4 py-3 rounded-2xl relative" role="alert">
                <strong className="font-bold">エラー: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {view === 'results' && !loading && renderResultsView()}

      </main>
        <footer className="text-center py-4 text-slate-500 text-sm">
            <p>Powered by 東武トップツアーズAIチーム</p>
        </footer>
    </div>
  );
}

export default App;